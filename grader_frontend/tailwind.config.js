/*

Customized

*/

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
    './src/components/*.{js,jsx,ts,tsx}',
    './src/Pages/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
  ],
  // purge: ['./public/**/*.html', './src/**/*.js', './src/components/**/*.js'],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
