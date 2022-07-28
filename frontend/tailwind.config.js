/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        largeCollections: "1fr 3fr",
      },
      colors: {
        primary: "#ff4800",
        main: "#628D54",
        sub1: "#8EC281",
        sub2: "#496548",
        font1: "#333333",
        font2: "#84898C",
        font3: "#F3F3F3",
        font4: "#D0D0D0",
        extra1: "#F0E2D0",
        extra2: "#AA8976",
        extra3: "#A0A0A0",
        extra4: "#E8E9ED",
        extra5: "#3A3C46",
        widget: "#25262D",
      },
      fontFamily: {
        logo: ["Titan One", "cursive"],
        basic: ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
