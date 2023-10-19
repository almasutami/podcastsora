import Head from "next/head";
import Toolbar from "./toolbar";
import styles from "../styles/Home.module.css";
import noprofile from "../assets/noprofile.png";

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Podcastsora</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main>
        <div className={styles.toolbarContainer}>
          <Toolbar onSearch={handleSearch} userAvatarSrc={noprofile.src} />
        </div>
        <h1 className={styles.title}>Podcastsora</h1>

        <p className={styles.description}>Every cloud has a silver lining.</p>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
