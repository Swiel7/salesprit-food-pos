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
      primary: {
        50: "#fff8f3",
        100: "#fef1e8",
        200: "#fee3d0",
        300: "#fa8f45",
        400: "#fa812d",
        500: "#f97316",
      },
      dark: {
        50: "#f5f3f2",
        100: "#ece7e5",
        200: "#d8cecb",
        300: "#54443f",
        400: "#3a2f2b",
        500: "#201a18",
      },
      gray: {
        50: "#fbfafa",
        100: "#f6f6f5",
        200: "#e5e3e2",
        300: "#b9b4b1",
        400: "#b0aaa8",
        500: "#a7a19e",
      },
      white: "#ffffff",
      red: "#ef4444",
      green: "#3fc28a",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      minHeight: {
        screen: "100dvh",
      },
    },
  },
  plugins: [formsPlugin],
};
