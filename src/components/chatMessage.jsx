// src/components/ChatMessage.js
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessage = ({ message, index }) => {
  const isUser = message.sender === "user";

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div
        className={`max-w-[90%] sm:max-w-xl p-4 rounded-3xl shadow-lg relative ${
          isUser
            ? "bg-gradient-to-tr from-purple-500 to-pink-500 text-white animate-bubblePop"
            : "bg-white/10 text-gray-100 border border-purple-800/50 animate-bubblePop"
        }`}
        style={{
          borderBottomLeftRadius: isUser ? "1.5rem" : "0.5rem",
          borderBottomRightRadius: isUser ? "0.5rem" : "1.5rem",
        }}
      >
        {!isUser && (
          <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 flex items-center justify-center text-white text-xs font-bold shadow-md">
            AI
          </div>
        )}

        <div className="prose prose-invert max-w-full break-words text-sm sm:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              strong: ({ children }) => (
                <strong className="text-pink-300 font-semibold">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="text-purple-300 italic">{children}</em>
              ),
              del: ({ children }) => (
                <del className="text-red-400 line-through">{children}</del>
              ),
              code({ inline, children, className }) {
                if (inline) {
                  return (
                    <code className="bg-gray-800 text-yellow-300 px-1 py-0.5 rounded text-xs">
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-gray-800 text-pink-200 p-3 rounded-lg overflow-x-auto text-sm my-2">
                    <code className={className}>{children}</code>
                  </pre>
                );
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-purple-200">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-purple-200">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="my-1">{children}</li>,
              table: ({ children }) => (
                <div className="overflow-x-auto my-2">
                  <table className="w-full text-left text-xs sm:text-sm border border-purple-600">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-purple-500 bg-purple-900/50 px-2 py-1 font-semibold text-purple-100">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-purple-700 px-2 py-1 text-purple-200">
                  {children}
                </td>
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>

        <div
          className={`text-xs mt-2 ${
            isUser ? "text-pink-100" : "text-purple-300"
          } text-right`}
        >
          {message.timestamp}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
