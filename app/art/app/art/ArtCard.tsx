// app/art/ArtCard.tsx
import styles from "./art.module.css";

import React from "react";

export function ArtCard({
  item,
}: {
  item: {
    objectID: number;
    title: string;
    artistDisplayName: string;
    primaryImageSmall: string;
    primaryImage?: string;
    objectDate?: string;
    objectName?: string;
    medium?: string;
    culture?: string;
    department?: string;
    objectURL?: string;
    creditLine?: string;
    dimensions?: string;
    country?: string;
    repository?: string;
  };
}) {
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
        {/* Use native lazy loading */}
        <img
          src={primaryImageSmall}
          alt={title}
          loading="lazy"
          className={styles.image}
        />
      </a>

      <div className={styles.meta}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.artist}>
          {artistDisplayName || <span className={styles.unknown}>Unknown artist</span>}
        </p>

        {/* At least 3 other properties */}
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
