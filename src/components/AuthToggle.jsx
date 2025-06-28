import React from "react";

function AuthToggle({ isLogin, setIsLogin }) {
  return (
    <div className="mt-4 text-center text-gray-200 text-sm">
      {isLogin ? (
        <>
          New to our world?{" "}
          <button
            onClick={() => setIsLogin(false)}
            className="text-pink-300 hover:text-pink-200 font-semibold
                                   transition duration-300 ease-in-out transform hover:scale-105
                                   focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50
                                   rounded-md px-2 py-0.5  cursor-pointer"
          >
            Register Now!
          </button>
        </>
      ) : (
        <>
          Already a traveler?{" "}
          <button
            onClick={() => setIsLogin(true)}
            className="text-purple-300 hover:text-purple-200 font-semibold
                                   transition duration-300 ease-in-out transform hover:scale-105
                                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                                   rounded-md px-2 py-0.5 cursor-pointer"
          >
            Login Here!
          </button>
        </>
      )}
    </div>
  );
}

export default AuthToggle;
