import React, {useState} from 'react';
import {Transition} from '@headlessui/react';
import {Mail, Lock} from 'lucide-react';
import Registration from "./Registration.jsx";

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        // Change min-h-screen to h-screen to ensure it fits
        <div
            className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 font-inter text-white relative overflow-hidden">
            {/* Make background elements smaller */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
                <div
                    className="absolute top-1/2 right-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div
                    className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-blue-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Make image section smaller */}
            <div className="hidden md:flex md:w-1/2 h-full items-center justify-center p-4 relative z-10">
                <img
                    src="/images/Tanjiro.png" // Smaller image
                    alt="Cute Anime Character"
                    className="w-full h-auto max-w-sm rounded-3xl shadow-2xl transform transition-transform duration-500 ease-in-out hover:scale-105 animate-fade-in"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/400x600/FFD1DC/6B46C1?text=Image+Error';
                    }}
                />
            </div>

            {/* Adjust form section padding and size */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-4 relative z-10">
                <div
                    className="bg-white/15 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl py-4 px-6 md:py-6 md:px-8 w-full max-w-sm border border-white/20 transform transition-all duration-500 ease-in-out animate-fade-in-up">
                    {/* Reduce heading size */}
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 animate-pulse-light">
                        {isLogin ? 'Welcome Back, Hero!' : 'Embark on a Journey!'}
                    </h1>

                    {/* Login Form transitions remain the same */}
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
                            <LoginForm/>
                        </div>
                    </Transition>

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
                            <Registration/>
                        </div>
                    </Transition>

                    {/* Adjust spacing and text size for toggle section */}
                    <div className="mt-4 text-center text-gray-200 text-sm">
                        {isLogin ? (
                            <>
                                New to our world?{' '}
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="text-pink-300 hover:text-pink-200 font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 rounded-md px-2 py-0.5"
                                >
                                    Register Now!
                                </button>
                            </>
                        ) : (
                            <>
                                Already a traveler?{' '}
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="text-purple-300 hover:text-purple-200 font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 rounded-md px-2 py-0.5"
                                >
                                    Login Here!
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Keep the animations styles as is */}
            <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes pulse-light {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }

        @keyframes fadeInFromBottom {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-pulse-light {
          animation: pulse-light 2s infinite ease-in-out;
        }

        .animate-fade-in-up {
          animation: fadeInFromBottom 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .input-focus-glow:focus {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.5); /* pink-500 with opacity */
          border-color: #ec4899; /* pink-500 */
        }
      `}</style>
        </div>
    );
}

// Update LoginForm component with smaller input fields and spacing
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', {email, password});
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    <Mail className="inline-block w-4 h-4 mr-2 text-pink-300"/>
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
                    placeholder="your.email@example.com"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                    <Lock className="inline-block w-4 h-4 mr-2 text-pink-300"/>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
                    placeholder="••••••••"
                />
                <div className="text-right mt-1">
                    <a href="#" className="text-xs text-purple-300 hover:text-purple-200 transition duration-300">
                        Forgot Password?
                    </a>
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-2 px-4 text-sm rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-70"
            >
                Login
            </button>

            <div className="relative flex items-center justify-center my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20"></span>
                </div>
                <div className="relative px-4 text-xs text-gray-300 bg-white/15 rounded-full">
                    Or continue with
                </div>
            </div>

            {/* Social login buttons with reduced padding */}
            <div className="flex flex-col space-y-2">
                <button
                    type="button"
                    className="w-full flex items-center justify-center bg-white/10 border border-white/30 text-white py-2 px-4 rounded-lg shadow-md text-sm transform transition duration-300 ease-in-out hover:scale-105 hover:bg-white/20 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16" className="mr-2">
                        <path fill="#FFC107"
                              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.083 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.065 3.09l5.661-5.661C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                        <path fill="#FF3D00"
                              d="M6.306 14.691L11.649 19.02C12.912 16.234 15.612 14 18.86 14c3.059 0 5.842 1.154 8.065 3.09l5.661-5.661C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                        <path fill="#4CAF50"
                              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.083 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.065 3.09l5.661-5.661C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                        <path fill="#1976D2"
                              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.083 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 8.065 3.09l5.661-5.661C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                    </svg>
                    Sign in with Google
                </button>
                <button
                    type="button"
                    className="w-full flex items-center justify-center bg-white/10 border border-white/30 text-white py-2 px-4 rounded-lg shadow-md text-sm transform transition duration-300 ease-in-out hover:scale-105 hover:bg-white/20 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                         fill="currentColor" className="mr-2">
                        <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.804 8.207 11.387 0.599 0.111 0.793-0.261 0.793-0.577v-2.234c-3.338 0.726-4.033-1.416-4.033-1.416-0.546-1.387-1.333-1.756-1.333-1.756-1.087-0.744 0.084-0.729 0.084-0.729 1.205 0.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.493 0.998 0.108-0.774 0.418-1.305 0.762-1.605-2.665-0.304-5.467-1.334-5.467-5.931 0-1.311 0.469-2.381 1.236-3.221-0.124-0.303-0.535-1.524 0.118-3.176 0 0 1.008-0.322 3.301 1.232 0.957-0.266 1.983-0.399 3.003-0.399 1.02 0 2.047 0.133 3.004 0.399 2.291-1.554 3.297-1.232 3.297-1.232 0.653 1.653 0.242 2.874 0.118 3.176 0.769 0.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 0.43 0.372 0.823 1.102 0.823 2.222v3.293c0 0.319 0.192 0.694 0.801 0.576 4.765-1.583 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    Sign in with GitHub
                </button>
            </div>
        </form>
    );
}

export default Login;