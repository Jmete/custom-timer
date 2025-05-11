import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Timer from "../components/Timer";
import SectionList from "../components/SectionList";
import TimerControls from "../components/TimerControls";
import ConfigManagement from "../components/ConfigManagement";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Work Meeting Timer</title>
        <meta name="description" content="Work Meeting Timer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image
            src="/timer-logo.svg"
            alt="Work Meeting Timer Logo"
            width={200}
            height={100}
            priority
          />
        </div>
        <Timer />

        <SectionList />
        <div className={styles.bottomControls}>
          <ConfigManagement />
        </div>
        <footer className={styles.footer}>
          <a href="https://jamesmete.com/">jamesmete.com</a>
        </footer>
      </main>
    </div>
  );
}
