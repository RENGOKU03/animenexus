import { useState, useEffect } from "react";
import { databases, ID, Permission, Role, Query } from "../lib/appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const useChatMessages = (currentUser, chatSessionID) => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [chatError, setChatError] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      if (!currentUser) return;
      setLoadingMessages(true);
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("chatSessionID", [chatSessionID]),
          Query.orderAsc("timestamp"),
          Query.limit(100),
        ]);

        const loaded = res.documents.map((doc) => ({
          id: doc.$id,
          text: doc.text,
          sender: doc.sender,
          timestamp: new Date(doc.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(
          loaded.length
            ? loaded
            : [
                {
                  id: ID.unique(),
                  text: "Welcome, fellow anime enthusiast! Ask me anything! ✨",
                  sender: "ai",
                  timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ]
        );
      } catch (err) {
        setChatError("Failed to load chat history.");
      } finally {
        setLoadingMessages(false);
      }
    };
    loadMessages();
  }, [currentUser]);

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  return { messages, addMessage, loadingMessages, chatError };
};
