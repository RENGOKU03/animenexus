import { useState, useEffect } from "react";
import { databases, ID, Query } from "../lib/appwrite";
import { addMessageToSessionWhenEmpty } from "../store/authSlice";
import { useDispatch } from "react-redux";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const useChatMessages = (currentUser, chatSessionID) => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [chatError, setChatError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadMessages = async () => {
      if (!currentUser) return;
      setLoadingMessages(true);
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("userId", [currentUser.$id]),
          Query.orderAsc("timestamp"),
          Query.limit(100),
        ]);

        const groupedSessions = {};

        for (const doc of res.documents) {
          const sessionID = doc.chatSessionID;
          const msg = {
            id: doc.$id,
            text: doc.text,
            sender: doc.sender,
            timestamp: new Date(doc.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            chatSessionID: sessionID,
          };

          if (!groupedSessions[sessionID]) {
            groupedSessions[sessionID] = [];
          }
          groupedSessions[sessionID].push(msg);
          console.log("Grouped message:", groupedSessions);
        }
        dispatch(addMessageToSessionWhenEmpty(groupedSessions));
      } catch (err) {
        setChatError("Failed to load chat history.");
      } finally {
        setLoadingMessages(false);
      }
    };

    loadMessages();
  }, [currentUser, dispatch]);

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  return { addMessage, loadingMessages, chatError };
};
