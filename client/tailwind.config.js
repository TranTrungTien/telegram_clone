module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        420: "420px",
        "0%": "0%",
        "35%": "35%",
      },
      height: {
        400: "400px",
      },
      minWidth: {
        300: "300px",
        420: "420px",
      },
      maxWidth: {
        "1/3": "33%",
        "0%": "0%",
        "35%": "35%",
        "40%": "40%",
      },
      colors: {
        color_0f0f0f: "#0f0f0f",
        color_212121: "#212121",
        color_707579: "#707579",
        color_aaaaaa: "#aaaaaa",
        color_6f6f6f: "#6f6f6f",
        color_8774e1: "#8774e1",
        color_2b2b2b: "#2b2b2b",
        color_181818: "#181818",
        color_c5c5c5: "#c5c5c5",
        color_f8f8f8: "#f8f8f8",
        color_c7c7c7: "#c7c7c7",
        color_292730: "#292730",
      },
      flex: {
        0: "0 0 0%",
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
      },
      zIndex: {
        "-10": "-10",
      },
    },
  },
  variants: {
    extend: {
      overflow: ["hover", "focus", "group-focus", "group-hover"],
      display: ["hover", "focus", "group-focus", "group-hover"],
      visibility: ["hover", "focus", "group-focus", "group-hover"],
    },
  },
  plugins: [],
};
