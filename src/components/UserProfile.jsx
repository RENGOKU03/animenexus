import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiUser3Line,
  RiMailLine,
  RiShieldUserLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { account } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { logout as logoutAction } from "../store/authSlice"; // Import the logout action from Redux
import { toast } from "react-toastify";

const UserProfile = ({ onClose }) => {
  const dispatch = useDispatch(); // Initialize dispatch hook
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;
  // user?.registration is typically an ISO 8601 string or Unix timestamp.
  // We'll format it for better readability.
  const registrationTimestamp = user?.registration;
  const username = user?.name;
  const chatSessions = useSelector((state) => state.auth.sessionChats); // Renamed for clarity

  const navigate = useNavigate();

  /**
   * Handles user logout:
   * 1. Deletes the current Appwrite session.
   * 2. Dispatches the Redux logout action to clear client-side state.
   * 3. Navigates the user to the login page.
   */
  async function handleLogout() {
    try {
      await account.deleteSession("current"); // Invalidate the current session on Appwrite
      dispatch(logoutAction()); // Dispatch Redux logout action to clear global state
      navigate("/login", { replace: true }); // Redirect to login page
    } catch (error) {
      toast.error("Error during logout:", error);
      // Optionally, show an error message to the user
      alert("Logout failed. Please try again."); // Use a custom modal in a real app
    }
  }

  // Calculate the total number of chat sessions
  // chatSessions is an object like { 'sessionID1': [...messages], 'sessionID2': [...] }
  const totalChatSessions = Object.keys(chatSessions || {}).length;

  // Format the registration date for display
  const formattedRegistrationDate = registrationTimestamp
    ? new Date(registrationTimestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"; // Display N/A if registration date is not available

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop for modal closure */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Profile Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-2xl border border-purple-700/50 w-full max-w-md z-10 overflow-hidden text-white"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close profile"
          >
            <RiCloseLine size={24} />
          </button>

          <div className="p-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-6">
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="mb-4"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-purple-500/30">
                  <RiUser3Line className="text-white" size={40} />
                </div>
              </motion.div>

              <h2 className="text-xl font-bold text-white">
                {username || "Guest User"}
              </h2>
              <div className="flex items-center mt-1 text-pink-300">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>Online</span>
              </div>
              <div className="mt-3 text-sm text-purple-300">Premium Member</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                className="bg-purple-800/30 rounded-xl p-3 text-center border border-purple-700/50"
                whileHover={{ y: -5 }}
              >
                {/* Displaying the count of sessions */}
                <div className="text-2xl font-bold text-pink-400">
                  {totalChatSessions}
                </div>
                <div className="text-xs text-purple-300">Chats</div>
              </motion.div>

              <motion.div
                className="bg-purple-800/30 rounded-xl p-3 text-center border border-purple-700/50"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold text-green-400">
                  {Math.floor(
                    (Date.now() - new Date(registrationTimestamp).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </div>
                <div className="text-xs text-purple-300">Days</div>
              </motion.div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-purple-800/30 rounded-xl border border-purple-700/50">
                <RiMailLine className="text-pink-400 mr-3" size={20} />
                <div>
                  <div className="text-xs text-purple-300">Email</div>
                  <div className="text-sm">{email || "N/A"}</div>
                </div>
              </div>

              <div className="flex items-center p-3 bg-purple-800/30 rounded-xl border border-purple-700/50">
                <RiShieldUserLine className="text-blue-400 mr-3" size={20} />
                <div>
                  <div className="text-xs text-purple-300">Member Since</div>
                  {/* Displaying the formatted registration date */}
                  <div className="text-sm">{formattedRegistrationDate}</div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 p-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium flex items-center justify-center cursor-pointer transition-colors hover:bg-gradient-to-r hover:from-pink-700 hover:to-purple-700 border border-purple-700/50"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <RiLogoutCircleLine className="mr-2" />
              Logout
            </motion.button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-pink-500/20 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-blue-500/20 blur-xl"></div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserProfile;
