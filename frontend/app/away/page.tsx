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

    const [editTitle, setEditTitle] = useState("");
    const [editMessage, setEditMessage] = useState("");

    const [newTitle, setNewTitle] = useState("");
    const [newMessage, setNewMessage] = useState("");

    // Manages PUT requests to update a message
    const handleUpdate = async () => {
        if (selectedID === null) {
            setError("Select a message before updating");
            return;
        }

        try {
            const response = await fetch( // Here is the request
                `/api/messages/${selectedID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: editTitle,
                        message: editMessage
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const updatedMessage: Message = await response.json();

            setMessages((currentMessages) =>
                currentMessages.map((msg) =>
                    msg.id === updatedMessage.id ? updatedMessage : msg
                )
            );

            setMessage(updatedMessage.message);
            setError(null);

        } catch (requestError) {
            if (requestError instanceof Error) {
                setError(requestError.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    
    }


    const handleCreate = async () => {
        if (!newTitle.trim() || !newMessage.trim()) {
            setError("Title and message are required");
            return;
        }

        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: newTitle,
                    message: newMessage,
                }),
            });

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const createdMessage: Message = await response.json();

            setMessages((currentMessages) => [
                ...currentMessages,
                createdMessage,
            ]);

            setSelectedID(createdMessage.id);
            setEditTitle(createdMessage.title);
            setEditMessage(createdMessage.message);
            setMessage(createdMessage.message);

            setNewTitle("");
            setNewMessage("");
            setError(null);
        
        } catch (requestError) {
            if (requestError instanceof Error) {
                setError(requestError.message);
            } else {
                setError("This message could not be created");
            }
        }
    };

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
            onChange={(event) => { // When an input is selected, update the selected ID and display the corresponding message
                const id = Number(event.target.value);
                setSelectedID(id);

                const selectedMessage = messages.find(
                    (msg) => msg.id === id
                );

                if (selectedMessage) {
                    setMessage(selectedMessage.message);
                    setEditTitle(selectedMessage.title);
                    setEditMessage(selectedMessage.message);
                }
            }}
        >
            <option value="" disabled>
                Select a message
            </option>

            {messages.map((msg) => (
                <option key={msg.id} value={msg.id}>
                {msg.title}
                </option>
            ))}
        </select>

            <h2>Edit message</h2>

            <label htmlFor="edit-title">Title</label>
            <input
                id="edit-title"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
            />

            <label htmlFor="edit-message">Message</label>
            <textarea
                id="edit-message"
                value={editMessage}
                onChange={(event) => setEditMessage(event.target.value)}
            />

            <button
                onClick={handleUpdate}
                disabled={selectedID === null}
            >
                Update message
            </button>


            <h2>Create a message</h2>

            <label htmlFor="new-title">Title</label>
            <input
                id="new-title"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
            />

            <label htmlFor="new-message">Message</label>
            <textarea
                id="new-message"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
            />

            <button
                onClick={handleCreate}
                disabled={!newTitle || !newMessage}
            >
                Create message
            </button>




      </main>
    </div>
  );
}