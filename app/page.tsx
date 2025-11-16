'use client';
import Link from "next/link";
import styles from "./home.module.css";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My Project</h1>

      <div className={styles.buttonsWrapper}>

        {}
        <Link href="/tic-tac-toe" className={styles.card}>
          <div className={styles.icon}>🎮</div>
          <span>Tic Tac Toe</span>
        </Link>
    
        {}
        <Link href="/art" className={styles.card}>
          <div className={styles.icon}>🖼️</div>
          <span>Art Gallery</span>
        </Link>

        {}
        <Link href="/design" className={styles.card}>
          <div className={styles.logoWrapper}>
            <Image 
              src="/logo.svg"    
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
          <span>Curators Ensemble</span>
        </Link> 

      </div>
    </div>
  );
}
