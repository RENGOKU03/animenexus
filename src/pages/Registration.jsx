import { useState } from "react";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import { account, ID } from "../lib/appwrite";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlelogin() {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      console.log(user);
      dispatch(login(user));
      navigate("/homepage", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      dispatch(logout());
      setError("Login failed. Please check your credentials.");
    }
  }
  async function handleLoginWithGithub() {
    try {
      account.createOAuth2Session(
        "github",
        "http://localhost:5173/homepage",
        "http://localhost:5173/loginError"
      );
    } catch (error) {
      console.error("Login with GitHub failed:", error);
      setError("Login with GitHub failed. Please try again.");
    }
  }
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await account.create(ID.unique(), email, password, userName);
      await handlelogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error message display */}
      {error && (
        <div className="flex items-center p-3 text-sm text-red-300 bg-red-900/30 border border-red-700 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Social Login Buttons at the top */}
      <div className="flex flex-col space-y-2 mb-2">
        <button
          type="button"
          className="w-full flex items-center justify-center bg-white/10 border border-white/30 text-white py-2 px-4 rounded-lg shadow-md text-sm transform transition duration-300 ease-in-out hover:scale-105 hover:bg-white/20 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-70"
          onClick={handleLoginWithGithub}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.804 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Sign up with GitHub
        </button>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/20"></span>
        </div>
        <div className="relative px-4 text-xs text-gray-300 bg-white/15 rounded-full">
          Or register with email
        </div>
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          <User className="inline-block w-4 h-4 mr-2 text-pink-300" />
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
          placeholder="Choose a username"
        />
      </div>

      <div>
        <label
          htmlFor="reg-email"
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          <Mail className="inline-block w-4 h-4 mr-2 text-pink-300" />
          Email Address
        </label>
        <input
          type="email"
          id="reg-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Password Field */}
      <div className="relative">
        <label
          htmlFor="reg-password"
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          <Lock className="inline-block w-4 h-4 mr-2 text-pink-300" />
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="reg-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] text-pink-400 hover:text-pink-600"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="relative">
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          <Lock className="inline-block w-4 h-4 mr-2 text-pink-300" />
          Confirm Password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirm-password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`w-full px-3 py-2 rounded-lg bg-white/10 border ${
            password && confirmPassword && password !== confirmPassword
              ? "border-red-500"
              : "border-white/30"
          } focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow`}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] text-pink-400 hover:text-pink-600"
        >
          {showConfirmPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
        {password && confirmPassword && password !== confirmPassword && (
          <p className="mt-1 text-xs text-red-400 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            Passwords don't match
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={password && confirmPassword && password !== confirmPassword}
        className={`w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-2 px-4 text-sm rounded-lg shadow-lg transform transition duration-300 ease-in-out cursor-pointer ${
          password && confirmPassword && password !== confirmPassword
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:scale-95"
        } focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-70`}
        onClick={handleRegister}
      >
        Create Account
      </button>

      <p className="text-center text-xs text-gray-300 mt-4">
        By registering, you agree to our{" "}
        <a href="#" className="text-purple-300 hover:text-purple-200 underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-purple-300 hover:text-purple-200 underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}

export default Registration;
