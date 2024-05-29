import Image from "next/image";
import styles from "./page.module.css";
import Calculator from "@/components/calculator/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <Calculator />
    </main>
  );
}
