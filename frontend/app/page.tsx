"use client"; // This component runs in the browser

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetch("/api/message")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { message: string }) => {
        setMessage(data.message);
      })
      .catch((requestError: Error) => {
        setError(requestError.message);
      });
  }, []);

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
          {error ? <p>Error: {error}</p> : <p>{message}</p>}
      </main>
    </div>
  );
}
