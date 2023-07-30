/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#23A6F0",
        secondary: "#23856D",
        text: "#737373",
        secondText: "#252B42",
        lightGray: "#FAFAFA",
      },
      boxShadow: {
        custom: "0 2px 4px rgba(0, 0, 0, 0.1)", // Replace with your custom shadow
      },
    },
    plugins: [],
  },
};
