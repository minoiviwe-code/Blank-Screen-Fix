/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F3D2E",
          50: "#E8F5F0",
          100: "#D1EBE1",
          200: "#A3D7C3",
          300: "#75C3A5",
          400: "#47AF87",
          500: "#1F5C4A",
          600: "#0F3D2E",
          700: "#0B3024",
          800: "#07231A",
          900: "#031610",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2F7F66",
          50: "#E8F5F0",
          100: "#D1EBE1",
          200: "#A3D7C3",
          300: "#75C3A5",
          400: "#2F7F66",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#C9A24D",
          light: "#E6D3A3",
          foreground: "#1A1A1A",
        },
        background: "#F7F7F7",
        foreground: "#1A1A1A",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        muted: {
          DEFAULT: "#F7F7F7",
          foreground: "#6B6B6B",
        },
        destructive: {
          DEFAULT: "#C62828",
          foreground: "#FFFFFF",
        },
        border: "#DADADA",
        input: "#DADADA",
        ring: "#0F3D2E",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
