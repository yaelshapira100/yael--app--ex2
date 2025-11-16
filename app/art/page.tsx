// app/art/page.tsx
import styles from "./art.module.css";

type Dept = { departmentId: number; displayName: string };
type DeptResponse = { departments: Dept[] };

type MetObject = {
  objectID: number;
  title: string;
  artistDisplayName?: string;
  primaryImageSmall?: string;
  primaryImage?: string;
  objectDate?: string;
  objectName?: string;
  medium?: string;
  culture?: string;
  department?: string;
  objectURL?: string;
  creditLine?: string;
  dimensions?: string;
  repository?: string;
  country?: string;
};

type ArtData = {
  department: Dept;
  items: MetObject[];
};

// ---- הקומפוננטה המאוחדת ----
function ArtCard({ item }: { item: MetObject }) {
  const {
    title,
    artistDisplayName,
    primaryImageSmall,
    objectDate,
    objectName,
    medium,
    culture,
    objectURL,
  } = item;

  return (
    <article className={styles.card}>
      <a
        href={objectURL || "#"}
        target="_blank"
        rel="noreferrer"
        className={styles.imageWrap}
        aria-label={`Open The Met page for ${title}`}
      >
        {primaryImageSmall ? (
          <img
            src={primaryImageSmall}
            alt={title}
            loading="lazy"
            className={styles.image}
          />
        ) : (
          <div className={styles.image} aria-hidden="true" />
        )}
      </a>

      <div className={styles.meta}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.artist}>
          {artistDisplayName || <span className={styles.unknown}>Unknown artist</span>}
        </p>
        <ul className={styles.props}>
          {objectName && (
            <li>
              <strong>Object:</strong> {objectName}
            </li>
          )}
          {objectDate && (
            <li>
              <strong>Date:</strong> {objectDate}
            </li>
          )}
          {medium && (
            <li>
              <strong>Medium:</strong> {medium}
            </li>
          )}
          {culture && (
            <li>
              <strong>Culture:</strong> {culture}
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}

// --------- פונקציית הדאטה ---------
export async function getArtData(
  departmentId: string,
  count: number
): Promise<ArtData> {
  const base = "https://collectionapi.metmuseum.org/public/collection/v1";

  const deptRes = await fetch(`${base}/departments`, { cache: "no-store" });
  if (!deptRes.ok) throw new Error("Failed to fetch departments from The Met API.");
  const deptJson: DeptResponse = await deptRes.json();

  const deptNum = Number(departmentId);
  const department = deptJson.departments.find((d) => d.departmentId === deptNum);
  if (!department) throw new Error(`Department ${departmentId} not found. Try a valid department id.`);

  const idsRes = await fetch(`${base}/objects?departmentIds=${deptNum}`, { cache: "no-store" });
  if (!idsRes.ok) throw new Error("Failed to fetch object IDs for the department.");
  const idsJson: { total: number; objectIDs: number[] | null } = await idsRes.json();
  const allIds = idsJson.objectIDs ?? [];
  if (!allIds.length) throw new Error("No objects found for this department.");

  const pickRandomUnique = (arr: number[], k: number) => {
    const a = arr.slice();
    const n = Math.min(k, a.length);
    for (let i = a.length - 1; i > a.length - 1 - n; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(a.length - n);
  };

  const desired = Math.max(1, Math.min(count, 50));
  const results: MetObject[] = [];
  const maxAttempts = 6;
  let attempt = 0;
  const tried = new Set<number>();

  while (results.length < desired && attempt < maxAttempts) {
    attempt++;
    const batchIds = pickRandomUnique(allIds, Math.min(50, desired * 4));
    const newIds = batchIds.filter((id) => !tried.has(id));
    newIds.forEach((id) => tried.add(id));

    const fetched = await Promise.all(
      newIds.map(async (id) => {
        try {
          const r = await fetch(`${base}/objects/${id}`, { cache: "no-store" });
          if (!r.ok) return null;
          const o = (await r.json()) as MetObject;
          if (!o?.primaryImageSmall || !o?.title) return null;
          return o;
        } catch {
          return null;
        }
      })
    );

    for (const obj of fetched) {
      if (obj) results.push(obj);
      if (results.length >= desired) break;
    }
  }

  if (!results.length) {
    throw new Error("Could not load artworks with images from this department. Please try again.");
  }

  return { department, items: results.slice(0, desired) };
}

// --------- הדף ---------
export default async function ArtPage({
  searchParams,
}: {
  searchParams?: { dept?: string; count?: string };
}) {
  const dept = searchParams?.dept ?? "11";
  const count = Number(searchParams?.count ?? "8");

  try {
    const data = await getArtData(dept, count);

    return (
      <main className={styles.page}>
        <h1 className={styles.title}>The Met — {data.department.displayName}</h1>
        <p className={styles.subtitle}>
          Showing {data.items.length} random items (dept id: {data.department.departmentId})
        </p>

        <section className={styles.grid}>
          {data.items.map((item) => (
            <ArtCard key={item.objectID} item={item} />
          ))}
        </section>
      </main>
    );
  } catch (err: any) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>The Met — Art Browser</h1>
        <div className={styles.errorBox}>
          <h2>We hit a snag</h2>
          <p>{err?.message ?? "Unknown error"}</p>
          <p className={styles.hint}>
            Try another department via <code>?dept=</code> or reduce <code>?count=</code>. For example:{" "}
            <code>/art?dept=6&count=6</code>
          </p>
        </div>
      </main>
    );
  }
}
