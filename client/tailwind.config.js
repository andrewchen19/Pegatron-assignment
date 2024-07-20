/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.gray,
    },
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1280px",
      },
      boxShadow: {
        xs: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
        sm: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
        lg: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
        xl: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
        "2xl":
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
        button: "rgba(66, 40, 0) 4px 4px 0px 0px",
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        navy: "#3A4972",
        turquoise: "#3B8EA0",
        kiwi: "#ECF3AB",
        olive: "#888D54",
        carrot: "#FF4742",
        red: "#FF465A",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        myLight: {
          primary: "#70acc7",
          secondary: "#da8ee7",
          accent: "#4d8576",
          neutral: "#F2AAAE",
          "base-100": "#ffffff",
        },
      },
      "nord",
      "sunset",
    ],
  },
};
