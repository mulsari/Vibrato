module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Notosans", "sans-serif"],
      },
      colors: {
        gray_light: "#F8F8F8",
        gray_dark: "#777777",
        gray_border: "#EEEEEE",
        searchBar: "#EEEEEE",
        coral: "#C07777",
        light_coral: "#DAB6B6",
        very_light_coral: "#e7dada",
        white: "#FFFFFF",
        black: "#000000",
        yellow: "#FFAF01",
      },
    },
  },
  plugins: [],
};
