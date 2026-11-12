import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>HOME</h1>
          <nav>
              <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/away">Away</a></li>
              </ul>
          </nav>
          <p>Welcome to the Home page!</p>
      </main>
    </div>
  );
}
