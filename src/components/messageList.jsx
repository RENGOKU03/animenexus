import { motion } from "framer-motion";
import ChatMessage from "./chatMessage";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MessageList = ({ messages, isLoading, error, messagesEndRef }) => {
  useEffect(() => {
    if (isLoading) {
      toast.info("Loading messages...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        className: "text-sm text-white bg-purple-600 shadow-md",
      });
    }
  }, [isLoading]);
  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent z-10">
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {messages.map((msg, index) => (
          <ChatMessage key={msg.id} message={msg} index={index} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-start"
          >
            <div className="px-4 py-2 rounded-2xl bg-purple-900/50 max-w-[100px] max-h-[100px] flex items-center justify-center overflow-hidden">
              <img
                src="./images/athink.gif"
                alt="Loading..."
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 rounded-2xl bg-red-900/50 text-red-200 max-w-xs md:max-w-md"
          >
            {error}
          </motion.div>
        )}

        {/* Scroll target */}
        <div ref={messagesEndRef} />
      </motion.div>
    </div>
  );
};

export default MessageList;
