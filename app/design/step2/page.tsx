'use client';
import Image from "next/image";
import common from "../design.module.css";
import styles from "./step2.module.css";
import ProgressBar from "../progressBar";



export default function Step2Page() {
  return (
    <main className={`${common.page} ${common.pageEnter}`}>
      <section className={common.frame}>
        <Image src="/logo.svg" alt="logo" width={120} height={120} className={common.logo} />

        {/* content area שמאפשר גלילה פנימית כאשר יש יותר תוכן */}
        <div className={styles.content}>
          <p className={styles.subtitle}>
            <span className={styles.subtitleHiglight}>הרקע והצורך</span>
            <p className={styles.bodyText}>
            תהליך האוצרות במוזיאון ישראל הוא ארוך, מבוסס על קשרים אישיים וחשוף למגבלות נגישות. אנסמבל נועד לקצר את הדרך, לחשוף אמנים חדשים וליצור שיתופי פעולה אמנותיים בזמן אמת.
          </p>
            </p>
        </div>
        <ProgressBar activeIndex={2} />
        </section>
    </main>
    );
}
