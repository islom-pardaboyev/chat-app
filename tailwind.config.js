/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
      },
	  fontFamily: {
		'consolas': ['Consolas', 'Courier New',],
	  },
      colors: {
        primary: {
          DEFAULT: "#F3F4F6",
          blue: '#3B81F6'
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
