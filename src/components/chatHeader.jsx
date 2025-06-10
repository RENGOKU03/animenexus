import { motion } from "framer-motion";

const ChatHeader = ({ chatTitle = "New Anime Chat" }) => {
  return (
    <motion.div
      className="flex items-center justify-between p-6 border-b border-purple-700/50 backdrop-blur-sm bg-gray-800/40 rounded-t-2xl shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400 drop-shadow-md">
        {chatTitle}
      </h2>
    </motion.div>
  );
};

export default ChatHeader;
