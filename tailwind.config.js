module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all files in the src directory for Tailwind classes
    "./public/index.html",        // Scans the HTML file if you're using Tailwind there
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },


    },
  },
  plugins: [],
};
