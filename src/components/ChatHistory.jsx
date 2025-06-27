import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { loadSession } from "../store/authSlice";

const ChatHistoryItem = () => {
  const chatHistory = useSelector((state) => state.auth.sessionChats);
  const activeSession = useSelector((state) => state.auth.chatSessionID);
  const dispatch = useDispatch();

  return (
    <div className="space-y-2 p-4">
      {Object.entries(chatHistory).map(([sessionID, messages], index) => {
        const lastMsg = messages[messages.length - 1];
        const isActive = sessionID === activeSession;
        const title = messages[0]?.text?.slice(0, 20) || "New Chat";

        return (
          <motion.div
            key={sessionID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-xl cursor-pointer ${
              isActive ? "bg-purple-700/50 shadow-lg" : "hover:bg-purple-800/30"
            } transition-all duration-300 border border-purple-800/30`}
            onClick={() => dispatch(loadSession(sessionID))}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-medium truncate">{title}</h3>
                  <span className="text-xs text-purple-300">
                    {lastMsg?.timestamp || ""}
                  </span>
                </div>
                <div className="mt-1 flex items-center">
                  {lastMsg && (
                    <motion.span
                      className="w-2 h-2 rounded-full bg-pink-500 mr-2"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <p className="text-xs text-purple-300 truncate">
                    {lastMsg?.text || "No messages yet"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ChatHistoryItem;
