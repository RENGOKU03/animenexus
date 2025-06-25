import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white font-sans overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 lg:p-8 flex justify-between items-center bg-transparent">
        <div className="flex items-center animate-fade-in-down">
          <span className="text-3xl font-extrabold text-blue-300">
            AniSense
          </span>
          <span className="text-3xl font-bold text-pink-400">.AI</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-lg animate-fade-in-down delay-200">
          <a
            href="#features"
            className="hover:text-blue-300 transition-colors duration-300 px-3 py-2"
          >
            Features
          </a>
          <Link
            to="/login"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Try AniSense
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 lg:py-32">
        {/* Background Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Your <span className="text-blue-300">AI Guide</span> to the{" "}
            <span className="text-pink-400">Anime Universe</span>.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Get instant, intelligent answers to all your anime questions. From
            plot summaries to character insights, reviews to ratings, AniSense
            AI has you covered.
          </p>
          <Link
            to="/login"
            className="inline-block px-10 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 animate-pop-in delay-400"
          >
            Start Your Anime Chat
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-in-up">
          What Can <span className="text-blue-300">AniSense AI</span> Do?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature Cards */}
          {[
            {
              icon: "💬",
              title: "Instant Answers",
              text: "Ask anything about your favorite anime or manga and get immediate, comprehensive responses.",
              color: "text-blue-400",
              delay: "delay-100",
            },
            {
              icon: "✨",
              title: "Detailed Reviews & Ratings",
              text: "Dive deep into community reviews, critics' opinions, and official ratings for any series.",
              color: "text-pink-400",
              delay: "delay-200",
            },
            {
              icon: "📚",
              title: "Plot Summaries & Spoilers",
              text: "Understand complex plots, arcs, and character developments, with spoiler warnings if needed!",
              color: "text-green-400",
              delay: "delay-300",
            },
            {
              icon: "🎭",
              title: "Character & Lore Deep Dives",
              text: "Explore backgrounds, abilities, and relationships of characters, plus rich world lore.",
              color: "text-yellow-400",
              delay: "delay-400",
            },
            {
              icon: "🏷️",
              title: "Genre & Recommendation Engine",
              text: "Discover new anime based on your favorite genres and personalized recommendations.",
              color: "text-red-400",
              delay: "delay-500",
            },
            {
              icon: "🔍",
              title: "Anything Anime!",
              text: "From production details to fan theories, if it's anime-related, AniSense AI knows it.",
              color: "text-orange-400",
              delay: "delay-600",
            },
          ].map(({ icon, title, text, color, delay }) => (
            <div
              key={title}
              className={`bg-purple-800 bg-opacity-70 rounded-2xl p-8 shadow-xl transform transition-transform duration-500 hover:scale-105 hover:bg-opacity-90 animate-fade-in-up ${delay}`}
            >
              <div className={`text-6xl mb-4 ${color}`}>{icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-200">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section id="start" className="py-16 md:py-24 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in-up">
          Ready to Explore the <span className="text-pink-400">Animeverse</span>
          ?
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-10 animate-fade-in-up delay-100">
          Unlock a new way to interact with your favorite anime and discover
          hidden gems.
        </p>
        <Link
          to={"/login"}
          className="inline-block px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-2xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 animate-pop-in delay-200"
        >
          Get Started with AniSense AI
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-400 text-sm">
        <p>&copy; 2025 AniSense AI. All rights reserved.</p>
        <p className="mt-2">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          for fellow Otakus.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
