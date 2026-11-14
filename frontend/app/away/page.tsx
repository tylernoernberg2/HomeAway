// Why do we have a new directory (away/) for this page?
// In Next.js, each directory under the "app" folder represents a route.
// The "away" directory corresponds to the "/away" route.
// Since we chose app directory routing, we create a new folder for each route.

// Automatically routed to localhost:3000/away (or the corresponding domain)

"use client";

import styles from "../page.module.css";
import { useState, useEffect } from "react";

type Message = {
    id: number;
    title: string;
    message: string;
};

type MessageResponse = {
    messages: Message[];
};

export default function Away() {
    const [message, setMessage] = useState("Loading...");
    const [error, setError] = useState<string | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedID, setSelectedID] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/messages")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }
                return response.json();
            })
            .then((data: MessageResponse) => {
                setMessages(data.messages);

                const awayMessage = data.messages.find(msg => msg.title === "Away");
                setMessage(awayMessage ? awayMessage.message : "Away message not found");
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
        
        {/* Select input that will allow the user to choose a message to display */}
        <select
            value={selectedID ?? ""}
            onChange={(event) => { {/* When an input is selected, update the selected ID and display the corresponding message */
                const id = Number(event.target.value);
                setSelectedID(id);

                const selectedMessage = messages.find(
                    (item) => item.id === id
                );

                if (selectedMessage) {
                    setMessage(selectedMessage.message);
                }
            }}
            >
            <option value="" disabled>
                Select a message
            </option>

            {messages.map((item) => (
                <option key={item.id} value={item.id}>
                {item.title}
                </option>
            ))}
            </select>

      </main>
    </div>
  );
}