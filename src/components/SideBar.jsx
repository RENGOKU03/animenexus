import { useState } from "react";
import "./tailwind.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiHome3Line,
  RiMessage2Line,
  RiHistoryLine,
  RiSettings3Line,
  RiUser3Line,
  RiCloseLine,
  RiMenuLine,
} from "react-icons/ri";
import ChatHistoryItem from "./ChatHistory";
import UserProfile from "./UserProfile";

const AnimeSidebar = ({ username }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [isExpanded, setIsExpanded] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const chatHistory = [
    { id: 1, title: "Naruto Discussion", date: "2023-04-15", unread: false },
    { id: 2, title: "One Piece Theories", date: "2023-04-10", unread: true },
    {
      id: 3,
      title: "Attack on Titan Finale",
      date: "2023-04-05",
      unread: false,
    },
    { id: 4, title: "My Hero Academia", date: "2023-04-01", unread: false },
    {
      id: 5,
      title: "Demon Slayer Analysis",
      date: "2023-03-28",
      unread: false,
    },
  ];

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleUserProfile = () => setShowUserProfile(!showUserProfile);

  return (
    <div className="flex h-screen overflow-hidden">
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-indigo-600 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isExpanded ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full md:w-64 lg:w-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white h-full flex flex-col shadow-2xl z-40"
          >
            {/* Logo Section */}
            <motion.div
              className="p-5 border-b border-purple-700/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="mr-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <RiMessage2Line size={20} />
                  </div>
                </motion.div>
                <motion.h1
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  AniSenese<span className="text-pink-400">.AI</span>
                </motion.h1>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="p-4 space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center p-3 rounded-xl ${
                  activeTab === "home"
                    ? "bg-purple-700/50 shadow-lg"
                    : "hover:bg-purple-800/30"
                } transition-all duration-300`}
                onClick={() => setActiveTab("home")}
              >
                <RiHome3Line className="mr-3 text-pink-300" size={20} />
                <span>Home</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center p-3 rounded-xl ${
                  activeTab === "chat"
                    ? "bg-purple-700/50 shadow-lg"
                    : "hover:bg-purple-800/30"
                } transition-all duration-300`}
                onClick={() => setActiveTab("chat")}
              >
                <RiMessage2Line className="mr-3 text-blue-300" size={20} />
                <span>New Chat</span>
              </motion.button>
            </div>

            {/* Chat History */}
            <div className="p-4 flex-1 overflow-y-auto scrollbar-hide">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-purple-300 flex items-center">
                  <RiHistoryLine className="mr-2" size={18} />
                  Recent Chats
                </h2>
                <span className="text-xs text-purple-300">
                  {chatHistory.length}
                </span>
              </div>
              <div className="space-y-2">
                {chatHistory.map((chat, index) => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    index={index}
                    isActive={activeTab === `chat-${chat.id}`}
                    onClick={() => setActiveTab(`chat-${chat.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-purple-700/50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center p-3 rounded-xl mb-2 ${
                  activeTab === "settings"
                    ? "bg-purple-700/50 shadow-lg"
                    : "hover:bg-purple-800/30"
                } transition-all duration-300`}
                onClick={() => setActiveTab("settings")}
              >
                <RiSettings3Line className="mr-3 text-green-300" size={20} />
                <span>Settings</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center p-3 rounded-xl hover:bg-purple-800/30 transition-all duration-300"
                onClick={toggleUserProfile}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <RiUser3Line size={16} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-purple-900"></div>
                </div>
                <div className="ml-3 text-left">
                  <div className="text-sm font-medium">{username}</div>
                  <div className="text-xs text-purple-300">Online</div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUserProfile && <UserProfile onClose={toggleUserProfile} />}
      </AnimatePresence>
    </div>
  );
};

export default AnimeSidebar;
