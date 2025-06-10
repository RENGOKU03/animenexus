import { useState } from "react";
import { Transition } from "@headlessui/react";
import Registration from "./Registration.jsx";
import LoginForm from "../components/LoginForm.jsx";
import AuthToggle from "../components/AuthToggle.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <div
        className="md:grid-cols-2 grid md:flex-row items-center justify-center
max-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 min-h-screen
                       font-inter text-white relative overflow-hidden p-4 sm:p-6"
      >
        <div className="w-full h-full flex flex-col p-2 md:p-4 relative z-10 ">
          <Link to="/" className="relative">
            <div className="flex items-center animate-fade-in-down mx-10 py-5">
              {/* AniSense AI Logo */}
              <span className="text-3xl font-extrabold text-blue-300">
                AniSense
              </span>
              <span className="text-3xl font-bold text-pink-400">.AI</span>
            </div>
          </Link>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-blue-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          {/* Image Section (hidden on small screens, shown on medium and up) */}
          <div className="hidden md:flex md:w-2/3 h-2/3 mx-auto p-4 relative z-10">
            <img
              src="/images/welcome.gif"
              alt="Login Image"
              className="w-full h-auto rounded-3xl shadow-2xl
                               transform transition-transform duration-500 ease-in-out hover:scale-105
                               animate-fade-in"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback also fails
                e.target.src =
                  "https://placehold.co/400x600/FFD1DC/6B46C1?text=Image+Error"; // Fallback image
              }}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-2/3 mx-auto p-2 md:p-4 relative z-10">
          <div
            className="bg-white/15 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl
                               py-4 px-6 md:py-6 md:px-8 w-full max-w-sm border border-white/20
                               transform transition-all duration-500 ease-in-out animate-fade-in-up"
          >
            <h1
              className="text-2xl md:text-3xl font-bold text-center mb-6
                                   text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300
                                   animate-pulse-light"
            >
              {isLogin ? "Welcome Back, Hero!" : "Embark on a Journey!"}
            </h1>

            {/* Transition for Login Form */}
            <Transition
              show={isLogin}
              enter="transition ease-out duration-500 transform"
              enterFrom="opacity-0 -translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-500 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <div>
                <LoginForm /> {/* Render LoginForm */}
              </div>
            </Transition>

            {/* Transition for Registration Form */}
            <Transition
              show={!isLogin}
              enter="transition ease-out duration-500 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-500 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              <div>
                <Registration /> {/* Render Registration */}
              </div>
            </Transition>

            {/* Component to toggle between Login and Registration */}
            <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
          </div>
        </div>

        {/* Global Animation Styles */}
        <style>{`
                @keyframes blob {
                  0% { transform: translate(0px, 0px) scale(1); }
                  33% { transform: translate(30px, -50px) scale(1.1); }
                  66% { transform: translate(-20px, 20px) scale(0.9); }
                  100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes pulse-light {
                  0%, 100% { filter: brightness(1); }
                  50% { filter: brightness(1.2); }
                }
                @keyframes fadeInFromBottom {
                  0% { opacity: 0; transform: translateY(20px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                  0% { opacity: 0; }
                  100% { opacity: 1; }
                }
                .animate-blob { animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55); }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .animate-pulse-light { animation: pulse-light 2s infinite ease-in-out; }
                .animate-fade-in-up { animation: fadeInFromBottom 0.8s ease-out forwards; }
                .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
                /* Focus glow for inputs */
                .input-focus-glow:focus {
                  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.5); /* pink-500 with opacity */
                  border-color: #ec4899; /* pink-500 */
                }
            `}</style>
      </div>
    </div>
  );
}

export default Login;
