import { motion } from "framer-motion";

const ChatHistoryItem = ({ chat, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-3 rounded-xl cursor-pointer ${
        isActive ? "bg-purple-700/50 shadow-lg" : "hover:bg-purple-800/30"
      } transition-all duration-300 border border-purple-800/30`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium truncate">{chat.title}</h3>
            <span className="text-xs text-purple-300">{chat.date}</span>
          </div>
          <div className="mt-1 flex items-center">
            {chat.unread && (
              <motion.span
                className="w-2 h-2 rounded-full bg-pink-500 mr-2"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <p className="text-xs text-purple-300 truncate">
              {chat.unread ? "New messages" : "No new messages"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHistoryItem;
