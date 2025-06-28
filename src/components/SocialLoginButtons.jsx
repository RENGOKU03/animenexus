import { useDispatch } from "react-redux";
import { account } from "../lib/appwrite";
import { login, logout } from "../store/authSlice";
import { OAuthProvider } from "appwrite";

function SocialLoginButtons() {
  const dispatch = useDispatch();
  async function handleLoginWithGithub() {
    try {
      account.createOAuth2Session(
        OAuthProvider.Github,
        "http://localhost:5173/homepage",
        "http://localhost:5173/loginError"
      );
    } catch (error) {
      console.error("Login with GitHub failed:", error);
      dispatch(logout());
    }
  }
  return (
    <>
      {/* Divider for "Or continue with" */}
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/20"></span>
        </div>
        <div className="relative px-4 text-xs text-gray-300 bg-white/15 rounded-full">
          Or continue with
        </div>
      </div>

      {/* Social login buttons */}
      <div className="flex flex-col space-y-2">
        <button
          type="button"
          className="w-full flex items-center justify-center bg-white/10 border border-white/30 text-white py-2 px-4 rounded-lg shadow-md text-sm transform transition duration-300 ease-in-out hover:scale-105 hover:bg-white/20 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-70"
          onClick={handleLoginWithGithub}
        >
          {/* GitHub SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.804 8.207 11.387 0.599 0.111 0.793-0.261 0.793-0.577v-2.234c-3.338 0.726-4.033-1.416-4.033-1.416-0.546-1.387-1.333-1.756-1.333-1.756-1.087-0.744 0.084-0.729 0.084-0.729 1.205 0.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.493 0.998 0.108-0.774 0.418-1.305 0.762-1.605-2.665-0.304-5.467-1.334-5.467-5.931 0-1.311 0.469-2.381 1.236-3.221-0.124-0.303-0.535-1.524 0.118-3.176 0 0 1.008-0.322 3.301 1.232 0.957-0.266 1.983-0.399 3.003-0.399 1.02 0 2.047 0.133 3.004 0.399 2.291-1.554 3.297-1.232 3.297-1.232 0.653 1.653 0.242 2.874 0.118 3.176 0.769 0.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 0.43 0.372 0.823 1.102 0.823 2.222v3.293c0 0.319 0.192 0.694 0.801 0.576 4.765-1.583 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </>
  );
}

export default SocialLoginButtons;
