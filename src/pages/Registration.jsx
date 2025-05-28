import React, {useState} from 'react';
import {Mail, Lock, User} from 'lucide-react';

function Registration() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration attempt:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Social Login Buttons at the top */}
            <div className="flex flex-col space-y-2 mb-2">
                <button
                    type="button"
                    className="w-full flex items-center justify-center bg-white/10 border border-white/30 text-white py-2 px-4 rounded-lg shadow-md text-sm transform transition duration-300 ease-in-out hover:scale-105 hover:bg-white/20 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16" className="mr-2">
                        <path fill="#FFC107"
                              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                        <path fill="#FF3D00"
                              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                        <path fill="#4CAF50"
                              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                        <path fill="#1976D2"
                              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Sign up with Google
                </button>
                <button
                    type="button"
                    className="w-full flex items-center justify-center bg-white/10 border border-white/30 text-white py-2 px-4 rounded-lg shadow-md text-sm transform transition duration-300 ease-in-out hover:scale-105 hover:bg-white/20 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                         fill="currentColor" className="mr-2">
                        <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.804 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
                <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
                    <User className="inline-block w-4 h-4 mr-2 text-pink-300"/>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
                    placeholder="Choose a username"
                />
            </div>

            <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-200 mb-1">
                    <Mail className="inline-block w-4 h-4 mr-2 text-pink-300"/>
                    Email Address
                </label>
                <input
                    type="email"
                    id="reg-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
                    placeholder="your.email@example.com"
                />
            </div>

            <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-200 mb-1">
                    <Lock className="inline-block w-4 h-4 mr-2 text-pink-300"/>
                    Password
                </label>
                <input
                    type="password"
                    id="reg-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
                    placeholder="••••••••"
                />
            </div>

            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-200 mb-1">
                    <Lock className="inline-block w-4 h-4 mr-2 text-pink-300"/>
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 focus:border-pink-400 focus:ring-pink-400 text-white placeholder-gray-300 text-sm transition duration-300 ease-in-out input-focus-glow"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-2 px-4 text-sm rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-70"
            >
                Create Account
            </button>

            <p className="text-center text-xs text-gray-300 mt-4">
                By registering, you agree to our{' '}
                <a href="#" className="text-purple-300 hover:text-purple-200 underline">
                    Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-300 hover:text-purple-200 underline">
                    Privacy Policy
                </a>
            </p>
        </form>
    );
}

export default Registration;