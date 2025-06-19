// src/components/MessageInput.js
import React from "react";
import { motion } from "framer-motion";
import { RiSendPlane2Fill, RiSparklingLine } from "react-icons/ri"; // Sparkle icon for AI suggestions

const MessageInput = ({
  input,
  setInput,
  onSendMessage,
  onGenerateSuggestion,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Allow Shift+Enter for new line
      e.preventDefault();
      a;
      onSendMessage();
    }
  };

  return (
    <motion.div
      className="p-6 border-t border-purple-700/50 backdrop-blur-sm bg-gray-800/40 rounded-b-2xl shadow-md flex items-center space-x-4"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <textarea
        className="flex-1 p-3 rounded-xl bg-gray-700/50 border border-purple-600/50 text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none h-12 overflow-hidden scrollbar-hide text-lg transition-all duration-200"
        placeholder="Type your anime thoughts here... ✨"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        rows={1} // Start with one row, grows with content
        onInput={(e) => {
          // Auto-resize textarea
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={onSendMessage}
        disabled={!input.trim()}
      >
        <RiSendPlane2Fill size={24} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={onGenerateSuggestion}
        title="Get AI Suggestion"
      >
        <RiSparklingLine size={24} />
      </motion.button>
    </motion.div>
  );
};

export default MessageInput;
