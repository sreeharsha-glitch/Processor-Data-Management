/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "ruby-red": "#b00041",
      },
      spacing: {
        '5px': '5px',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

