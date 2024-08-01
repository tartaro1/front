module.exports = {
  content: [
    "./*.{html,js}",
    "./**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3FE6C00",
        secondary: "#262626",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')  // Replace 'flowbite/plugin' with the correct plugin name
  ],
}
