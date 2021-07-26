module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      backgroundImage: theme => ({
        'hero': "url('/images/hero.jpg')",
      }),
      top: {
        '-16': '-4rem',
      },
      mt: {
        '-16': '-4rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
