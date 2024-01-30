/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      ipadmini: { max: "768px" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
