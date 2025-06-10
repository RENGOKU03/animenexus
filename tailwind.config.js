module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                "float": "float 6s ease-in-out infinite",
                "blink": "blink 1.5s infinite",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            },
            keyframes: {
                float: {
                    "0%, 100%": {transform: "translateY(0) rotate(0deg)"},
                    "50%": {transform: "translateY(-12px) rotate(2deg)"},
                },
                blink: {
                    "0%, 100%": {opacity: 1},
                    "50%": {opacity: 0.3},
                }
            },
            colors: {
                animePink: "#ff9ebb",
                animePurple: "#c5a1ff",
                animeBlue: "#a6e3ff",
                animeGreen: "#a6ffc7",
                animeBg: "#1a1a2e",
            }
        },
    },
    plugins: [],
}