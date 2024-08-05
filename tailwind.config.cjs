/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "inicio" : "url('/src/assets/inicio.jpg')",
        "inicioSolo" : "url('/src/assets/solos2.png')",
        "save" : "url('/src/assets/save.png')",
        "recepcion" : "url('/src/assets/recepcion.jpg')",
        "confirmar" : "url('/src/assets/confirmar.jpg')",
      },
      fontFamily: {
        save: ['I Love Glitter', 'sans-serif'],
        nombres: ['Adeptly', 'sans-serif'],
      },
    },
  },
  variants: {
    backdropFilter: ['responsive'],
  },
  plugins: [],
};
