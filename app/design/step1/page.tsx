'use client';
import Image from "next/image";
import common from "../design.module.css";
import styles from "./step1.module.css";
import ProgressBar from "../progressBar";

export default function Step1Page() {
  return (
    <main className={`${common.page} ${common.pageEnter}`}>
      <section className={common.frame}>
        <Image src="/logo.svg" alt="logo" width={120} height={120} className={common.logo} />

        {}
        <div className={styles.content}>
          <p className={styles.subtitle}>
            <span className={styles.subtitleHiglight}>פלטפורמה דיגיטלית המחברת בין אמנים ואוצרים </span>
            <span className={styles.subtitleNormal}>במטרה לייעל את תהליך האוצרות וליצור הזדמנויות חדשות לשיתופי פעולה מקצועיים.</span>
          </p>
        </div>

        <ProgressBar activeIndex={1} />
      </section>
    </main>
  );
}
