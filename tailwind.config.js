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
      primary: "#FE5B18",
      dark: "#201A18",
      gray: "#A7A19E",
      white: "#FFFFFF",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
