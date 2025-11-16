'use client';
import Link from "next/link";
// @ts-ignore: CSS module types not found
import styles from "./design.module.css";

type Props = { activeIndex: number }; // 0 = design, 1..4 = steps

export default function ProgressBar({ activeIndex }: Props) {
  const routes = [
    "/design",        // 0
    "/design/step1",  // 1
    "/design/step2",  // 2
    "/design/step3",  // 3
    "/design/step4",  // 4
  ];

  return (
    <nav className={styles.progressBar} aria-label="Progress">
      {routes.map((href, index) => {
        const isActive = index === activeIndex;
        return (
          <Link key={href} href={href}>
            <span
              className={isActive ? styles.lineActive : styles.line}
              aria-current={isActive ? "step" : undefined}
            />
          </Link>
        );
      })}
    </nav>
  );
}
