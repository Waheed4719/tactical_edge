import type { Config } from "tailwindcss";

const config: Config = {
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
      fontFamily: {
        inter: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#2bd17e",
        error: "#eb5757",
        bgColor: "#093545",
        inputColor: "#224957",
        cardColor: "#092c39",
        textColor: "#c3c8d4",
        textBodyColor: "#767E94",
      },
      fontSize: {
        h1: ["64px", { lineHeight: "80px", fontWeight: "500" }],
        h2: ["48px", { lineHeight: "56px", fontWeight: "500" }],
        h3: ["32px", { lineHeight: "40px", fontWeight: "500" }],
        h4: ["24px", { lineHeight: "32px", fontWeight: "bold" }],
        h5: ["20px", { lineHeight: "24px", fontWeight: "bold" }],
        h6: ["16px", { lineHeight: "24px", fontWeight: "bold" }],
        bodyLarge: ["20px", { lineHeight: "32px" }],
        bodyRegular: ["16px", { lineHeight: "24px" }],
        bodySmall: ["14px", { lineHeight: "24px" }],
        caption: ["14px", { lineHeight: "16px" }],
      },
      borderRadius:{
        "10": "10px",
        "20": "20px",
        "30": "30px",
        "40": "40px",
        "50": "50px",
        "60": "60px",
        "70": "70px",
        "80": "80px",
        "90": "90px",
        "100": "100px",
      },
      spacing: {
        "1": "2px",
        "2": "4px",
        "3": "8px",
        "4": "12px",
        "5": "16px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "120px",
        "32": "160px",
      },
    },
  },
  plugins: [],
};
export default config;
