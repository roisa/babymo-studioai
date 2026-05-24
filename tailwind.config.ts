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
      letterSpacing: {
        "display-tight": "-0.035em",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1.2, 0.36, 1)",
        "ios-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ios-in": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backdropSaturate: {
        180: "1.8",
      },
      boxShadow: {
        // Soft ambient depth (cards, surfaces)
        soft: "0 1px 2px rgba(40,32,26,0.04), 0 8px 24px -8px rgba(40,32,26,0.08)",
        softer:
          "0 1px 2px rgba(40,32,26,0.03), 0 24px 48px -16px rgba(40,32,26,0.10)",

        // iOS Liquid Glass treatment — multi-layer with inner highlight
        glass:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(40,32,26,0.04) inset, 0 1px 2px rgba(40,32,26,0.04), 0 12px 32px -12px rgba(40,32,26,0.12)",
        "glass-dark":
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.2) inset, 0 1px 2px rgba(0,0,0,0.2), 0 16px 40px -12px rgba(0,0,0,0.5)",

        // Elevated, floating surfaces
        lift: "0 2px 4px rgba(40,32,26,0.06), 0 12px 28px -10px rgba(40,32,26,0.14), 0 40px 80px -32px rgba(40,32,26,0.18)",
        floating:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 8px -2px rgba(40,32,26,0.06), 0 24px 48px -12px rgba(40,32,26,0.18), 0 60px 120px -36px rgba(40,32,26,0.22)",

        // Pressed / inset
        pressed:
          "0 1px 2px rgba(40,32,26,0.10) inset, 0 0 0 1px rgba(40,32,26,0.04) inset",

        // Accent glow (terracotta CTAs)
        glow: "0 1px 0 rgba(255,255,255,0.3) inset, 0 0 0 1px rgba(213,105,57,0.20), 0 12px 28px -8px rgba(213,105,57,0.40)",

        // Hairline ring used as base for many glass surfaces
        hairline: "0 0 0 1px rgba(40,32,26,0.06)",
        "hairline-dark": "0 0 0 1px rgba(255,255,255,0.06)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        squircle: "1.75rem",
      },
      backgroundImage: {
        "warm-gradient":
          "radial-gradient(at 20% 10%, #fae7da 0%, transparent 50%), radial-gradient(at 80% 0%, #f3e8d4 0%, transparent 45%), radial-gradient(at 60% 90%, #e6ede1 0%, transparent 55%)",
        "warm-gradient-dark":
          "radial-gradient(at 20% 10%, rgba(213,105,57,0.18) 0%, transparent 50%), radial-gradient(at 80% 0%, rgba(200,163,110,0.12) 0%, transparent 45%), radial-gradient(at 60% 90%, rgba(104,136,87,0.12) 0%, transparent 55%)",
        // Subtle ambient mesh for app surfaces
        "mesh-light":
          "radial-gradient(circle at 8% 12%, rgba(244,205,180,0.55) 0%, transparent 38%), radial-gradient(circle at 92% 8%, rgba(243,232,212,0.6) 0%, transparent 36%), radial-gradient(circle at 78% 88%, rgba(230,237,225,0.55) 0%, transparent 40%), radial-gradient(circle at 18% 92%, rgba(250,231,218,0.4) 0%, transparent 36%)",
        "mesh-dark":
          "radial-gradient(circle at 8% 12%, rgba(213,105,57,0.14) 0%, transparent 38%), radial-gradient(circle at 92% 8%, rgba(200,163,110,0.10) 0%, transparent 36%), radial-gradient(circle at 78% 88%, rgba(104,136,87,0.10) 0%, transparent 40%), radial-gradient(circle at 18% 92%, rgba(213,105,57,0.06) 0%, transparent 36%)",
        // Inner gloss for buttons & chips (top-down highlight)
        "ios-gloss":
          "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 50%)",
        "ios-gloss-dark":
          "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%)",
        // Subtle grain
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2.4s linear infinite",
        float: "float 6s ease-in-out infinite",
        "drift-slow": "drift 18s ease-in-out infinite",
        breath: "breath 5s ease-in-out infinite",
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
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.06)" },
        },
        breath: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
