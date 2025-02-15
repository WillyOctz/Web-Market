/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#a8d5a8', 
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['autofill'], // Enable autofill variant
      textColor: ['autofill'],       // Enable text color variant
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

