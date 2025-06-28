import { useState, useCallback } from "react"; // Added useCallback for memoizing functions
import { ID, databases, Permission, Role } from "../lib/appwrite";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

// Define Appwrite IDs from environment variables
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const useMessageHandler = (currentUser, addMessage, chatSessionID) => {
  const [sending, setSending] = useState(false); // State to track if a message is currently being sent
  const [apiError, setApiError] = useState(null); // State to store any API-related errors

  /**
   * Formats an ISO string timestamp into an IST readable format.
   * Displays only time for today's messages, and date + time for older messages.
   * @param {string} isoString - The ISO 8601 string to format (e.g., new Date().toISOString()).
   * @returns {string} The formatted timestamp.
   */
  const formatISTTimestamp = useCallback((isoString) => {
    const date = new Date(isoString);
    // Convert to Asia/Kolkata timezone explicitly
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
  }, []); // Memoize the function as it has no dependencies (it's a pure utility function)

  /**
   * Saves a message object to the Appwrite database.
   * Permissions are set to allow only the current user to read and write their messages.
   * @param {object} msg - The message object to save (must contain text, sender, etc.).
   */
  const saveMessage = useCallback(
    async (msg) => {
      // Only attempt to save if a user is logged in
      if (!currentUser) {
        toast.warn("Attempted to save message without a logged-in user.");
        return;
      }
      try {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(), // Generates a unique ID for the document
          {
            userId: currentUser.$id, // Associate message with the current user's ID
            text: msg.text,
            chatSessionID: chatSessionID, // Link message to the current chat session
            sender: msg.sender,
            timestamp: msg.timestamp, // Use the timestamp generated when the message was created
          },
          [
            // Set read/write permissions for the specific user
            Permission.read(Role.user(currentUser.$id)),
            Permission.write(Role.user(currentUser.$id)),
          ]
        );
        // Removed the incorrect call to useChatMessages(currentUser) here.
        // The useChatMessages hook should handle listening for database changes on its own.
      } catch (err) {
        toast.error("Error saving message to Appwrite: ");
        setApiError("Failed to save message history."); // Set an error if saving fails
      }
    },
    [currentUser, chatSessionID, setApiError] // Dependencies for useCallback: currentUser, chatSessionID, setApiError
  );

  /**
   * Calls the external AI API (OpenRouter) to get a chat completion.
   * @param {string} text - The user's message to send to the AI.
   * @returns {string | null} The AI's response content, or null if an error occurs.
   */
  const callAIAPI = useCallback(
    async (text) => {
      try {
        const res = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                import.meta.env.VITE_OPENROUTER_API_KEY
              }`,
              // It's good practice to dynamically set these if they change, or keep them static if fixed.
              "HTTP-Referer": "https://your-anime-chat-app.com", // Replace with your actual deployed URL
              "X-Title": "AniSense.AI Anime Chat",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-r1-0528-qwen3-8b:free", // Model to use
              messages: [
                {
                  role: "system",
                  content: `You are AniSense.AI - an anime expert assistant. Your rules:
1. ONLY discuss topics related to Japanese anime, manga, doujinshi, and their creators.
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
   - Politely decline to answer.
   - Explain you're specialized in anime.
   - Suggest an anime-related topic.
4. Use markdown formatting for rich responses.
5. Keep responses engaging and passionate about anime!
6. If unsure about anime relation, ask clarifying questions.
7. Always give concise, informative answers.
8. Always give answers below 1900 characters.`, // Character limit for AI response
                },
                { role: "user", content: text }, // User's input message
              ],
              temperature: 0.7, // Controls randomness of response (0.0-1.0)
              max_tokens: 1000, // Maximum number of tokens for the AI's response
            }),
          }
        );

        if (!res.ok) {
          // If the API response is not OK (e.g., 4xx, 5xx status)
          const errorData = await res.json();
          toast.error("AI API Error Response:");
          throw new Error(
            `AI API Error: ${res.status} - ${
              errorData.message || "Unknown error"
            }`
          );
        }
        const data = await res.json();
        return data.choices[0].message.content; // Extract the AI's message content
      } catch (err) {
        toast.error("AI API Error: ");

        setApiError("AniSense.AI failed to respond. Please try again."); // User-friendly error message
        return null;
      }
    },
    [setApiError]
  ); // Dependency for useCallback: setApiError

  /**
   * Main function to send a message (user or silent suggestion) and get an AI response.
   * It updates the UI, saves messages, and handles loading/error states.
   * @param {string} text - The content of the message to send.
   * @param {object} [options] - Optional settings for sending the message.
   * @param {boolean} [options.isSilent=false] - If true, the user message will not be added to the UI immediately.
   * @returns {string | null} The AI's response text, or null if an error occurred.
   */
  const sendMessage = useCallback(
    async (text, { isSilent = false } = {}) => {
      if (!text.trim()) {
        return null; // Don't send empty messages
      }

      setSending(true); // Indicate that a message is being sent
      setApiError(null); // Clear any previous API errors

      try {
        const currentTimestamp = formatISTTimestamp(new Date().toISOString());

        if (!isSilent) {
          // Add user message to UI immediately unless it's a silent generation
          const userMessage = {
            id: uuid(), // Unique ID for the message in the UI
            text,
            sender: "user",
            timestamp: currentTimestamp,
          };
          addMessage(userMessage); // Update React state for instant UI feedback
          await saveMessage(userMessage); // Persist user message to Appwrite
        }

        // Call the AI API for a response
        const aiReply = await callAIAPI(text);
        if (!aiReply) {
          // If AI didn't respond, stop here. Error would have been set by callAIAPI.
          return null;
        }

        // Create the AI message object
        const aiMessage = {
          id: uuid(),
          // Slice the AI response to adhere to a reasonable character limit, though API also limits
          text: String(aiReply).slice(0, 5000),
          sender: "ai",
          timestamp: formatISTTimestamp(new Date().toISOString()), // Get a new timestamp for the AI's response
        };
        addMessage(aiMessage); // Update React state for AI message
        await saveMessage(aiMessage); // Persist AI message to Appwrite

        return aiReply; // Return the AI's response for potential further use
      } catch (err) {
        toast.error("Error in sendMessage flow:");
        setApiError("Something went wrong during the chat. Please try again."); // Generic error for the overall flow
        return null;
      } finally {
        setSending(false); // Reset sending state once the operation is complete
      }
    },
    [addMessage, saveMessage, callAIAPI, formatISTTimestamp, setApiError]
  ); // Dependencies for useCallback

  return { sendMessage, sending, apiError };
};
