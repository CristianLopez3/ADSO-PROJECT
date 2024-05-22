/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Poppins", "system-ui"],
      serif: ["Poppins", "Georgia"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      boxShadow: {
        "3xl": "0px -12px 191px -43px rgba(0,0,0,0.75)",
      },
      colors: {
        primary: "#ff8700",
        secondary: "#101010",
        grayDark: "#3D3B40",
        grayLight: "rgb(242 243 248)",
        third: "#ff8710",
        zinc: {
          '850': "#232326",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
