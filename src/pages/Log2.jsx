import React from 'react';

function Log2() {
    // Placeholder image for Tanjiro Kamado
    const tanjiroImage = "https://placehold.co/600x600/8A2BE2/FFFFFF?text=Tanjiro"; // Using a purple background to match the theme

    return (
        <div className="min-h-screen bg-purple-900 text-white font-inter flex flex-col items-center justify-center p-4">
            {/* Status Bar - Visible on small screens, hidden on large */}
            <div className="w-full max-w-md flex justify-between items-center text-sm mb-4 md:hidden">
                <span>9:41</span>
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 12V8H6V12H8ZM10 12V6H8V12H10ZM12 12V4H10V12H12ZM14 12V2H12V12H14Z"/>
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M17 5H3C2.44772 5 2 5.44772 2 6V14C2 14.5523 2.44772 15 3 15H17C17.5523 15 18 14.5523 18 14V6C18 5.44772 17.5523 5 17 5ZM17 7V13H3V7H17Z"/>
                    </svg>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                className="w-full max-w-md bg-purple-800 rounded-3xl shadow-lg overflow-hidden flex flex-col items-center md:max-w-4xl md:flex-row md:justify-between md:p-8 md:space-x-8">
                {/* Image Section - Responsive sizing and animation */}
                <div className="w-full flex justify-center items-center p-4 md:w-1/2 md:p-0">
                    <div
                        className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-purple-700 overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
                        <img
                            src={tanjiroImage}
                            alt="Tanjiro Kamado"
                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:rotate-3"
                            onError={(e) => {
                                e.target.onerror = null; // Prevents infinite loop
                                e.target.src = "https://placehold.co/600x600/8A2BE2/FFFFFF?text=Image+Not+Found"; // Fallback
                            }}
                        />
                    </div>
                </div>

                {/* Text and Buttons Section */}
                <div className="w-full p-6 text-center md:w-1/2 md:text-left md:p-0">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                        animeyabu<span className="text-purple-400">.</span>
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg mb-8 leading-relaxed animate-fade-in-up delay-100">
                        Assista animes online em HD, legendado ou dublado, no seu celular ou computador.
                        Animeyabu, o seu portal de animes online!
                    </p>

                    <div
                        className="flex flex-col sm:flex-row sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                        <button
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 animate-fade-in-up delay-200">
                            Login
                        </button>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 animate-fade-in-up delay-300">
                            Registro
                        </button>
                    </div>

                    <a
                        href="#"
                        className="text-purple-300 hover:text-purple-200 text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 animate-fade-in-up delay-400"
                    >
                        Explorar Catálogo
                    </a>
                </div>
            </div>
            {/* Custom Tailwind CSS for animations */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
        </div>
    );
}

export default Log2;
