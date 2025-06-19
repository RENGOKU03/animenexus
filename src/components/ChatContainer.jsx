import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import ChatHeader from "./chatHeader";
import MessageList from "./MessageList";
import MessageInput from "./messageInput";
import { useCurrentUser } from "../customHooks/useCurrentUser";
import { useChatMessages } from "../customHooks/useChatMessages";
import { useMessageHandler } from "../customHooks/useMessageHandler";

const ChatContainer = () => {
  const messagesEndRef = useRef(null);
  const [chatSessionID, setChatSessionID] = useState(uuid());
  const { currentUser, userError } = useCurrentUser();
  const { messages, addMessage, loadingMessages, chatError } = useChatMessages(
    currentUser,
    chatSessionID
  );
  const { sendMessage, sending, apiError } = useMessageHandler(
    currentUser,
    addMessage,
    chatSessionID
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerateSuggestion = async () => {
    const prompt = `Ask me a fun, anime-related question. Choose from topics like characters, history, trivia, genres, or conventions. Keep it brief and interesting.`;

    if (!currentUser) return;

    const aiResponse = await sendMessage(prompt, { isSilent: true });

    if (aiResponse) {
      setInput(aiResponse); // show suggestion in textbox
    } else {
      addMessage({
        id: crypto.randomUUID(),
        text: "Hmm, I couldn’t find any fresh anime news. Try again in a bit!",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 rounded-3xl m-4 shadow-2xl relative overflow-hidden">
      <ChatHeader chatTitle="AniSense.AI Chat" />
      <MessageList
        messages={messages}
        isLoading={loadingMessages || sending}
        error={chatError || userError || apiError}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput
        input={input}
        setInput={setInput}
        onSendMessage={() => {
          if (input.trim()) sendMessage(input);
          setInput(""); // clear textbox after sending
        }}
        onGenerateSuggestion={handleGenerateSuggestion}
        isLoading={sending || !currentUser}
      />

      {!currentUser && (
        <div className="p-4 text-center text-yellow-300 bg-gray-800/50 rounded-b-3xl">
          Please log in to save and load your chat history.
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
