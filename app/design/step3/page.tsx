'use client';
import Image from "next/image";
import common from "../design.module.css";
import styles from "./step3.module.css";
import ProgressBar from "../progressBar";

export default function Step3Page() {
  return (
    <main className={`${common.page} ${common.pageEnter}`}>
      <section className={common.frame}>
        <Image src="/logo.svg" alt="logo" width={120} height={120} className={common.logo} />

        <div className={styles.content}>
          <h3 className={styles.sectionTitle}><strong>קהל יעד:</strong></h3>
          <ul className={`${styles.list} ${styles.bulleted}`}>
            <li className={styles.listItem}>אמנים ויוצרים חזותיים</li>
            <li className={styles.listItem}>אוצרים ואוצרות במוזיאונים ובמוסדות תרבות.</li>
          </ul>

          <div className={styles.separator} />

          <h3 className={styles.sectionTitle}><strong>פיצרים עיקריים:</strong></h3>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureTitle}><strong>פרופיל משתמש</strong></div>
              <div className={styles.featureText}>עבודות, תיאור ותגיות.</div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureTitle}><strong>מערכת סוויפים</strong></div>
              <div className={styles.featureText}>התאמות בין אוצר לאמן.</div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureTitle}><strong>צאט</strong></div>
              <div className={styles.featureText}>תקשורת מקצועית לאחר מאצ.</div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureTitle}><strong>עמוד לייקים</strong></div>
              <div className={styles.featureText}>איסוף מועמדים רלוונטים.</div>
            </div>

            <div className={`${styles.featureItem} ${styles.fullWidth}`}>
              <div className={styles.featureTitle}><strong>העדפות</strong></div>
              <div className={styles.featureText}>סינון מתקדם לפי תחום גיל וקטגוריה.</div>
            </div>
          </div>
        </div>

        <ProgressBar activeIndex={3} />
      </section>
    </main>
  );
}
