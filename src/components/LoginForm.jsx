import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthInput from "./AuthInput";
import SocialLoginButtons from "./SocialLoginButtons";
import { account } from "../lib/appwrite";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./errorModal";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleLogin() {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      dispatch(login(user));
      navigate("/homepage", { replace: true });
    } catch (error) {
      dispatch(logout());
      setErrorMessage("Incorrect email or password.");
      setErrorModalOpen(true);
    }
  }

  return (
    <div className="space-y-4">
      {/* Email Input Field */}
      <AuthInput
        id="email"
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="inline-block w-4 h-4 mr-2 text-pink-300" />}
        required
      />

      {/* Password Input Field */}
      <div>
        <div className="relative">
          <AuthInput
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="inline-block w-4 h-4 mr-2 text-pink-300" />}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-8 text-pink-400 hover:text-pink-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {/* Forgot Password Link */}
        <div className="text-right mt-1">
          <a
            href="#"
            className="text-xs text-purple-300 hover:text-purple-200 transition duration-300"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-400 to-purple-500
                           hover:from-pink-500 hover:to-purple-600
                           text-white font-bold py-2 px-4 text-sm rounded-lg shadow-lg
                           transform transition duration-300 ease-in-out hover:scale-105 active:scale-95
                           focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-70 cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </button>

      {/* Social Login Buttons Section */}
      <SocialLoginButtons />
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={errorMessage}
      />
    </div>
  );
}

export default LoginForm;
