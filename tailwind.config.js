module.exports = {
  mode: "jit",
  content: ["./views/**/*.ejs", "./public/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter', sans-serif"
      }
    },
  },
  plugins: [],
}
