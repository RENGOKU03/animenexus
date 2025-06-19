import { useState } from "react";
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

const AnimeSidebar = ({ username, chatHistory }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [isExpanded, setIsExpanded] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleUserProfile = () => setShowUserProfile(!showUserProfile);

  // Navigation items
  const navItems = [
    { id: "newchat", icon: RiHome3Line, color: "text-pink-300" },
    { id: "chat history", icon: RiMessage2Line, color: "text-blue-300" },
    { id: "settings", icon: RiSettings3Line, color: "text-green-300" },
  ];

  // Main sidebar content
  const renderSidebarContent = () => (
    <div className="w-full md:w-64 lg:w-72 bg-indigo-900 text-white h-full flex flex-col shadow-2xl z-40">
      {/* Logo Section */}
      <div className="p-5 border-b border-purple-700/50 flex justify-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
            <RiMessage2Line size={20} />
          </div>
          <h1 className="text-xl font-bold">
            AniSense<span className="text-pink-400">.AI</span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center p-3 rounded-xl ${
              activeTab === item.id
                ? "bg-purple-700/50"
                : "hover:bg-purple-800/30"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className={`mr-3 ${item.color}`} size={20} />
            <span>{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Chat History */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between mb-3">
          <h2 className="text-sm font-semibold text-purple-300 flex items-center">
            <RiHistoryLine className="mr-2" size={18} />
            Recent Chats
          </h2>
          <span className="text-xs text-purple-300">{chatHistory?.length}</span>
        </div>
        <div className="space-y-2">
          {chatHistory?.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              chat={chat}
              isActive={activeTab === `chat-${chat.id}`}
              onClick={() => {
                setActiveTab(`chat-${chat.id}`);
                onSessionSelect(chat.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-purple-700/50">
        <button
          className="w-full flex items-center p-3 rounded-xl hover:bg-purple-800/30"
          onClick={toggleUserProfile}
        >
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <RiUser3Line size={16} />
          </div>
          <div className="ml-3 text-left">
            <div className="text-sm font-medium">{username}</div>
            <div className="text-xs text-purple-300">Online</div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-indigo-600 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isExpanded ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {renderSidebarContent()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {showUserProfile && <UserProfile onClose={toggleUserProfile} />}
      </AnimatePresence>
    </div>
  );
};

export default AnimeSidebar;
