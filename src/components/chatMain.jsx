// src/components/ChatMainPage.js
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./chatHeader";
import ChatMessage from "./chatMessage";
import MessageInput from "./messageInput";

const ChatMainPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome, fellow anime enthusiast! How can I help you today? Ask me about your favorite series, characters, or even some **trivia**! ✨",
      sender: "ai",
      timestamp: "10:00 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGPTAPI = async (prompt) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://your-anime-chat-app.com", // Replace with your actual site URL
            "X-Title": "AniSense.AI Anime Chat", // Replace with your site name
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
            messages: [
              {
                role: "system",
                content: `You are AniSense.AI - an anime expert assistant. Your rules:
1. ONLY discuss topics related to Japanese anime, manga, doujinshi, and their creators
2. Permitted topics: 
   - Anime series/movies (e.g., Naruto, Attack on Titan)
   - Manga/Light novels (e.g., One Piece, Berserk)
   - Creators (e.g., Hayao Miyazaki, Eiichiro Oda)
   - Voice actors (e.g., Maile Flanagan, Yūki Kaji)
   - Studios (e.g., Studio Ghibli, MAPPA)
   - Related culture (e.g., cosplay, conventions)
   - Anime music/OSTs
   - Merchandise/figures
3. For NON-ANIME queries:
   - Politely decline to answer
   - Explain you're specialized in anime
   - Suggest an anime-related topic
4. Use markdown formatting for rich responses
5. Keep responses engaging and passionate about anime!
6. If unsure about anime relation, ask clarifying questions`,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.error("Error calling API:", err);
      setError("Failed to get response. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input.trim(),
        sender: "user",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      // Get AI response
      const aiResponse = await callGPTAPI(input.trim());

      if (aiResponse) {
        const newAiMessage = {
          id: messages.length + 2,
          text: aiResponse,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      } else {
        // Fallback for API errors
        const fallbackMessage = {
          id: messages.length + 2,
          text: "Sorry, I'm having trouble connecting to the anime knowledge base. Maybe ask about your favorite series?",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prevMessages) => [...prevMessages, fallbackMessage]);
      }
    }
  };

  const handleGenerateSuggestion = async () => {
    const suggestionPrompt = `Generate an engaging anime-related question about one of these topics: 
  - Popular anime series recommendations
  - Character analysis
  - Manga comparisons
  - Studio or creator insights
  - Anime history or trivia
  - Genre-specific recommendations
  - Underrated gems
  - Anime music or soundtracks
  - Cosplay tips
  - Convention experiences`;

    const suggestion = await callGPTAPI(suggestionPrompt);

    if (suggestion) {
      setInput(suggestion);
    } else {
      // Anime-focused fallback suggestions
      const animeSuggestions = [
        "What's the best anime for someone who loves psychological thrillers?",
        "Can you compare the manga and anime versions of Demon Slayer?",
        "Who are the most iconic voice actors in the industry?",
        "What Studio Ghibli film should I watch next?",
        "Explain the different types of anime genres",
        "What manga should I read if I enjoyed Attack on Titan?",
        "Who is the most powerful anime character of all time?",
        "What are some must-watch anime movies?",
        "How has anime evolved over the decades?",
        "Recommend an anime with amazing fight choreography",
      ];
      const randomSuggestion =
        animeSuggestions[Math.floor(Math.random() * animeSuggestions.length)];
      setInput(randomSuggestion);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 rounded-3xl m-4 shadow-2xl relative overflow-hidden">
      {/* Background decoration elements for anime vibe */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-10 left-20"></div>
        <div className="absolute w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-40 right-10"></div>
        <div className="absolute w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-10 left-10"></div>
      </div>

      <ChatHeader chatTitle="AniSense.AI Chat" />

      {/* Message List Area */}
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
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-start"
            >
              <div className="px-4 py-2 rounded-2xl bg-purple-900/50 max-w-xs md:max-w-md">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 rounded-2xl bg-red-900/50 text-red-200 max-w-xs md:max-w-md"
            >
              {error}
            </motion.div>
          )}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </motion.div>
      </div>

      <MessageInput
        input={input}
        setInput={setInput}
        onSendMessage={handleSendMessage}
        onGenerateSuggestion={handleGenerateSuggestion}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatMainPage;
