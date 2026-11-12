// Why do we have a new directory (away/) for this page?
// In Next.js, each directory under the "app" folder represents a route.
// The "away" directory corresponds to the "/away" route.
// Since we chose app directory routing, we create a new folder for each route.

// Automatically routed to localhost:3000/away (or the corresponding domain)

import styles from "../page.module.css";

export default function Away() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>AWAY</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/away">Away</a></li>
          </ul>
        </nav>
        <p>Welcome to the Away page!</p>
      </main>
    </div>
  );
}