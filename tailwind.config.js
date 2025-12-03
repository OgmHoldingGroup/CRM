/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#7c7b84",
        "custom-blue": "#001A36",
        "custom-baby-blue": "#0060AB",
      },
    },
  },
  plugins: [],
};
