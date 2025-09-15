/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
         
          'primary': '#3a86ff',      
          'secondary': '#8338ec',   
          'accent': '#ff006e',      
          'dark': '#1e293b',       
          'light': '#f8fafc',      
        },
      },
    },
    plugins: [],
  }