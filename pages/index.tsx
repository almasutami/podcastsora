import Head from "next/head";
import Toolbar from "./toolbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const today = new Date();
  const day = () => {
    switch (today.getDay()) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "";
    }
  };
  const date = () => {
    if (today.getDate() < 10) {
      return "0" + today.getDate();
    } else {
      return today.getDate();
    }
  };
  const month = () => {
    if (today.getMonth() + 1 < 10) {
      return "0" + today.getMonth() + 1;
    } else {
      return today.getMonth() + 1;
    }
  };
  const year = today.getFullYear();
  const hour = () => {
    if (today.getHours() < 10) {
      return "0" + today.getHours();
    } else {
      return today.getHours();
    }
  };
  const minute = () => {
    if (today.getMinutes() < 10) {
      return "0" + today.getMinutes();
    } else {
      return today.getMinutes();
    }
  };
  const second = () => {
    if (today.getSeconds() < 10) {
      return "0" + today.getSeconds();
    } else {
      return today.getSeconds();
    }
  };
  const greetings = () => {
    if (today.getHours() < 12) {
      return "Morning";
    } else if (today.getHours() < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Podcastsora</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main suppressHydrationWarning>
        <div className={styles.toolbarContainer}>
          <Toolbar onSearch={handleSearch} />
        </div>
        <div className={styles.content}>
          <div className={styles.greetingsContainer}>
            <div className={styles.greetings}>
              <div>Good</div>
              <div>{greetings()}!</div>
            </div>
            <div className={styles.words}>It's sunny now! Time to go out!</div>
            <div>
              {day()}, {date()}/{month()}/{year} {hour()}:{minute()}:{second()}
            </div>
            <div>
              <img className={styles.icon} src="/cloud.png" alt="Cloud" />
              <img className={styles.icon} src="/cloudday.png" alt="Cloud" />
              <img className={styles.icon} src="/cloudnight.png" alt="Cloud" />
              <img className={styles.icon} src="/rainsun.png" alt="Cloud" />
              <img className={styles.icon} src="/rainy.png" alt="Cloud" />
              <img className={styles.icon} src="/snowing.png" alt="Cloud" />
              <img className={styles.icon} src="/storm.png" alt="Cloud" />
              <img className={styles.icon} src="/sun.png" alt="Cloud" />
              <img className={styles.icon} src="/wind.png" alt="Cloud" />
            </div>
          </div>
        </div>
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
