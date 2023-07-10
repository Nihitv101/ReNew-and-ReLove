/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary:"#1D5B79",
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  }
}
