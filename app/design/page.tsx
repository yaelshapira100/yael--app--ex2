'use client';
import Image from "next/image";
// @ts-ignore: CSS module types not found
import styles from "./design.module.css";
import { useRouter } from "next/navigation";
import ProgressBar from "./progressBar";

export default function DesignPage() {
  const router = useRouter();
  return (
    <main className={`${styles.page} ${styles.pageEnter}`}>
      <section className={styles.frame}>
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={200}
          className={styles.logo}
        />
        <h1 className={styles.title}>
          <span className={styles.titleMain}>אנסמבל </span>
          <span className={styles.titleSub}>אוצרים</span>
        </h1>
        <p className={styles.subtitle}>
            <span className={styles.subtitleHiglight}> אפליקציית הכרויות </span>
            <span className={styles.subtitleNormal}>בין אמנים ואוצרים מטעם מוזיאון ישראל</span>

        </p>


        

        <ProgressBar activeIndex={0} />
      </section>
    </main>
  );
}