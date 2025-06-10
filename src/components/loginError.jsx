import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginError() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-pink-100 px-6 py-10 text-center">
      <motion.img
        src="./images/tryagain.gif"
        alt="App Logo"
        className="w-40 h-40 mb-6 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 rounded-2xl shadow-xl p-8 max-w-md w-full border border-pink-300"
      >
        <AlertTriangle className="text-pink-500 w-12 h-12 mx-auto mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold text-purple-600 mb-2">
          Oops! Login Failed 💥
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          Something went wrong while trying to log you in. Please try again or
          go back to the home page.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition duration-300 shadow-md"
          >
            ⬅ Back to Home
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 shadow-md"
          >
            🔐 Try Login Again
          </button>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-10 text-pink-400 text-xs"
      >
        Made with ❤️ for fellow Otakus.
      </motion.div>
    </div>
  );
}
