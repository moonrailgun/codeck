const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [path.resolve(__dirname, './src/**/*.{js,jsx,ts,tsx}')],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
