module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@csstools/postcss-oklab-function")({ preserve: true }),
  ],
}
