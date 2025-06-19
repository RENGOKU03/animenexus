import { useState } from "react";
import { ID, databases, Permission, Role } from "../lib/appwrite";
import { v4 as uuid } from "uuid";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const useMessageHandler = (currentUser, addMessage, chatSessionID) => {
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState(null);

  const formatISTTimestamp = (isoString) => {
    const date = new Date(isoString);
    const istDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const today = new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const messageDate = istDate.toLocaleDateString("en-IN");

    const time = istDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (messageDate === today) {
      return time; // Only time for today's messages
    } else {
      return `${messageDate}, ${time}`; // Date + time for older messages
    }
  };

  const saveMessage = async (msg) => {
    if (!currentUser) return;
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          userId: currentUser.$id,
          text: msg.text,
          chatSessionID: chatSessionID,
          sender: msg.sender,
          timestamp: formatISTTimestamp(new Date().toISOString()),
        },
        [
          Permission.read(Role.user(currentUser.$id)),
          Permission.write(Role.user(currentUser.$id)),
        ]
      );
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  const callGPTAPI = async (text) => {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://your-anime-chat-app.com",
          "X-Title": "AniSense.AI Anime Chat",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          messages: [
            {
              role: "system",
              content: `You are AniSense.AI - an anime expert assistant. Your rules:
1. ONLY discuss topics related to Japanese anime, manga, doujinshi, and their creators
2. Permitted topics:
   - Anime series/movies (e.g., Naruto, Attack on Titan)
   - Manga/Light novels (e.g., One Piece, Berserk)
   - Creators (e.g., Hayao Miyazaki, Eiichiro Oda)
   - Voice actors (e.g., Maile Flanagan, Yūki Kaji)
   - Studios (e.g., Studio Ghibli, MAPPA)
   - Related culture (e.g., cosplay, conventions)
   - Anime music/OSTs
   - Merchandise/figures
3. For NON-ANIME queries:
   - Politely decline to answer
   - Explain you're specialized in anime
   - Suggest an anime-related topic
4. Use markdown formatting for rich responses
5. Keep responses engaging and passionate about anime!
6. If unsure about anime relation, ask clarifying questions
7. Always give concise, informative answers
8. Always give answers below 1900 characters`,
            },
            { role: "user", content: text },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.error(err);
      setApiError("AI failed to respond.");
      return null;
    }
  };

  const sendMessage = async (text, { isSilent = false } = {}) => {
    if (!text.trim()) return null;

    setSending(true);
    setApiError(null);

    try {
      if (!isSilent) {
        const userMessage = {
          id: uuid(),
          text,
          sender: "user",
          timestamp: formatISTTimestamp(new Date().toISOString()),
        };
        addMessage(userMessage);
        saveMessage(userMessage);
      }

      const aiReply = await callGPTAPI(text);
      if (!aiReply) return null;

      const aiMessage = {
        id: uuid(),
        text: String(aiReply).slice(0, 5000), // limit to 1900 characters
        sender: "ai",
        timestamp: formatISTTimestamp(new Date().toISOString()),
      };
      addMessage(aiMessage);
      saveMessage(aiMessage);

      return aiReply;
    } catch (err) {
      setApiError("Something went wrong.");
      return null;
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending, apiError };
};
