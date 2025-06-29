import { useEffect, useRef, useState } from "react";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import { useChatMessages } from "../customHooks/useChatMessages";
import { useMessageHandler } from "../customHooks/useMessageHandler";
import MessageList from "./messageList";
import { useDispatch, useSelector } from "react-redux";
import { setChatSessionID } from "../store/authSlice";
import { v4 as uuidv4 } from "uuid";
const ChatContainer = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.user);
  const chatSessionID = useSelector((state) => state.auth.chatSessionID);
  const messages = useSelector(
    (state) => state.auth.sessionChats[chatSessionID] || []
  );
  useEffect(() => {
    if (!chatSessionID || chatSessionID === "null") {
      const newSessionID = uuidv4();
      dispatch(setChatSessionID(newSessionID));
    }
  }, [chatSessionID, dispatch]);

  const { addMessage, loadingMessages, chatError } =
    useChatMessages(currentUser);
  const { sendMessage, sending, apiError } = useMessageHandler(
    currentUser,
    addMessage,
    chatSessionID
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerateSuggestion = async () => {
    const prompt = `Give me a fun, exciting or tirvial anime fact Choose from topics like characters, history, trivia, genres, or conventions. Keep it brief and interesting.`;

    if (!currentUser) return;

    const aiResponse = await sendMessage(prompt, { isSilent: true });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 rounded-3xl m-4 shadow-2xl relative overflow-hidden">
      <ChatHeader chatTitle="AniSense.AI Chat" />
      <div className=" overflow-hidden p-4 space-y-4 h-10">
        {messages.length === 0 && !loadingMessages && (
          <div className="text-center text-gray-500">
            Start chatting with AniSense.AI!
          </div>
        )}
        {messages.length > 0 && <div ref={messagesEndRef} />}
      </div>
      <MessageList
        messages={messages}
        isLoading={loadingMessages || sending}
        error={chatError || apiError}
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
