
'use client';
import common from "../design.module.css";
import styles from "./step4.module.css";
import ProgressBar from "../progressBar";


const items = [
  { src: "/list_logo.svg", label: "מאצ התחלתי" },
  { src: "/swipe_logo.svg", label: "ביצוע סוויפ" },
  { src: "/feed_logo.svg", label: "פיד מותאם אישית" },
  { src: "/profile_logo.svg", label: "יצירת פרופיל" }
];

export default function Step4Page() {
  return (
    <main className={`${common.page} ${common.pageEnter}`}>
      <section className={common.frame}>
        <h2 className={styles.title}>תהליכי הפעולה באפליקציה:</h2>

        <div className={styles.iconsRow}>
          {items.map((it, i) => (
            <figure key={i} className={styles.iconItem}>
              <div className={styles.iconWrap}>
                <img src={it.src} alt={it.label} width={46} height={46} />
              </div>
              <figcaption className={styles.iconLabel}>{it.label}</figcaption>
            </figure>
          ))}
        </div>

        <ProgressBar activeIndex={4} />
      </section>
    </main>
  );
}
