import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfaf5",
          100: "#faf4ea",
          200: "#f3e8d4",
          300: "#ead7b6",
          400: "#dbc095",
          500: "#c8a36e",
        },
        sand: {
          50: "#f8f5f1",
          100: "#efe9e0",
          200: "#ddd0bd",
          300: "#c4b194",
          400: "#a8916f",
          500: "#8a7654",
          600: "#6f5d40",
          700: "#574832",
          800: "#3f3324",
          900: "#28201a",
          950: "#15110d",
        },
        terracotta: {
          50: "#fdf5f0",
          100: "#fae7da",
          200: "#f4cdb4",
          300: "#ecaa83",
          400: "#e28658",
          500: "#d56939",
          600: "#bf522d",
          700: "#9d4028",
          800: "#7f3525",
          900: "#682d22",
        },
        sage: {
          50: "#f4f7f2",
          100: "#e6ede1",
          200: "#cddcc3",
          300: "#abc29c",
          400: "#86a473",
          500: "#688857",
          600: "#506c44",
          700: "#405638",
          800: "#354531",
          900: "#2d3a2a",
        },
      },
      fontFamily: {
        serif: ["'Fraunces'", "ui-serif", "Georgia", "Cambria", "serif"],
        sans: [
          "'Inter'",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(40,32,26,0.04), 0 8px 24px -8px rgba(40,32,26,0.08)",
        softer:
          "0 1px 2px rgba(40,32,26,0.03), 0 24px 48px -16px rgba(40,32,26,0.10)",
        glow: "0 0 0 1px rgba(213,105,57,0.15), 0 18px 50px -12px rgba(213,105,57,0.30)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "warm-gradient":
          "radial-gradient(at 20% 10%, #fae7da 0%, transparent 50%), radial-gradient(at 80% 0%, #f3e8d4 0%, transparent 45%), radial-gradient(at 60% 90%, #e6ede1 0%, transparent 55%)",
        "warm-gradient-dark":
          "radial-gradient(at 20% 10%, rgba(213,105,57,0.18) 0%, transparent 50%), radial-gradient(at 80% 0%, rgba(200,163,110,0.12) 0%, transparent 45%), radial-gradient(at 60% 90%, rgba(104,136,87,0.12) 0%, transparent 55%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2.4s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
