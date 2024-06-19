import formsPlugin from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins, sans-serif",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#F97316",
      dark: "#201A18",
      gray: "#A7A19E",
      white: "#FFFFFF",
      red: "#EF4444",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [formsPlugin],
};
