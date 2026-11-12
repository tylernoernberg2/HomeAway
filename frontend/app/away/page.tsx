// Why do we have a new directory (away/) for this page?
// In Next.js, each directory under the "app" folder represents a route.
// The "away" directory corresponds to the "/away" route.
// Since we chose app directory routing, we create a new folder for each route.

// Automatically routed to localhost:3000/away (or the corresponding domain)

"use client";

import styles from "../page.module.css";
import { useState, useEffect } from "react";

export default function Away() {
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
        <h1>AWAY</h1>
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