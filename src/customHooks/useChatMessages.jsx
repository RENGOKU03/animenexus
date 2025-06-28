import { useState, useEffect, useCallback } from "react";
import { databases, Query } from "../lib/appwrite"; // Removed ID as it's not used here
import {
  addMessageToSessionWhenEmpty,
  updateSessionChat,
} from "../store/authSlice";
import { useDispatch } from "react-redux"; // Import appwriteClient for subscriptions
import { client as appwriteClient } from "../lib/appwrite";
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const useChatMessages = (currentUser, chatSessionID) => {
  // `messages` holds the messages for the *currently active* chatSessionID
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true); // Initial state set to true as data is loading
  const [chatError, setChatError] = useState(null);
  const dispatch = useDispatch();

  /**
   * Memoized callback to add a message to the local state.
   * This is passed to useMessageHandler to update the UI instantly.
   * @param {object} msg - The message object to add.
   */
  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []); // No dependencies as it only uses `setMessages`

  useEffect(() => {
    // This effect handles both initial loading of all user messages
    // and setting up the real-time subscription.

    // If no user is logged in, stop loading and show appropriate message
    if (!currentUser) {
      setMessages([]);
      setLoadingMessages(false);
      setChatError("Please log in to load chat history.");
      return;
    }

    const loadAndSubscribeMessages = async () => {
      setLoadingMessages(true);
      setChatError(null); // Clear any previous errors before starting

      let unsubscribe = () => {}; // Initialize unsubscribe function

      try {
        // --- 1. Fetch ALL existing messages for the current user (regardless of session) ---
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("userId", [currentUser.$id]),
          Query.orderAsc("timestamp"), // Order by timestamp to maintain chronological order
          Query.limit(100), // Limit the number of documents fetched
        ]);

        const allFetchedMessages = res.documents.map((doc) => ({
          id: doc.$id,
          text: doc.text,
          sender: doc.sender,
          // Format timestamp for display. Ensure this matches format in useMessageHandler
          timestamp: new Date(doc.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          chatSessionID: doc.chatSessionID,
        }));

        // Group all fetched messages by session ID for Redux dispatch
        const groupedSessions = {};
        for (const msg of allFetchedMessages) {
          if (!groupedSessions[msg.chatSessionID]) {
            groupedSessions[msg.chatSessionID] = [];
          }
          groupedSessions[msg.chatSessionID].push(msg);
        }

        // Set local state `messages` only for the currently active session
        // If chatSessionID is not found in groupedSessions, it will be an empty array
        setMessages(groupedSessions[chatSessionID] || []);

        // Dispatch all grouped sessions to Redux.
        // This action should update or initialize the sessions in your authSlice.
        dispatch(addMessageToSessionWhenEmpty(groupedSessions));
      } catch (err) {
        console.error("Error loading chat history:", err);
        setChatError("Failed to load chat history.");
        setMessages([]); // Clear messages on error
      } finally {
        setLoadingMessages(false);
      }

      // --- 2. Appwrite Realtime Subscription for ALL user messages ---
      // Subscribe to all document changes within the collection for real-time updates.
      unsubscribe = appwriteClient.subscribe(
        `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
        (response) => {
          // Check if the event is a document creation and belongs to the current user.
          // We remove the sessionID filter here to catch all user messages for Redux.
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            ) &&
            response.payload.userId === currentUser.$id
          ) {
            const newDoc = response.payload;
            const newMessage = {
              id: newDoc.$id,
              text: newDoc.text,
              sender: newDoc.sender,
              timestamp: new Date(newDoc.timestamp).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),
              chatSessionID: newDoc.chatSessionID,
            };

            // Conditionally update local `messages` state ONLY if the new message
            // belongs to the currently active chat session.
            if (newMessage.chatSessionID === chatSessionID) {
              // Ensure no duplicates are added to the local state
              setMessages((prev) => {
                if (!prev.some((msg) => msg.id === newMessage.id)) {
                  return [...prev, newMessage];
                }
                return prev;
              });
            }

            // Always dispatch the new message to Redux to keep the global session state updated.
            // Assuming `updateSessionMessages` can handle adding a single message to a specific session.
            dispatch(
              updateSessionChat({
                sessionId: newMessage.chatSessionID, // Use the session ID from the new message
                message: newMessage,
                type: "add", // Indicate that it's an addition
              })
            );
          }
        }
      );

      // Cleanup function for the subscription:
      // This will run when the component unmounts or when `currentUser` or `chatSessionID` changes,
      // ensuring the previous subscription is cleaned up before a new one is established.
      return () => {
        unsubscribe(); // Unsubscribe to prevent memory leaks and stale updates.
      };
    };

    // Call the function to load messages and set up the subscription.
    loadAndSubscribeMessages();
  }, [currentUser, chatSessionID, dispatch, addMessage]); // Dependencies: Hook re-runs if these change

  return { messages, addMessage, loadingMessages, chatError };
};
