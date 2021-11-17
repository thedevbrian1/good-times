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
        'about': "url('/images/giraffe-silhouette.jpg')",
        'packages': "url('/images/astronaut.jpg')",
      }),
      top: {
        '-16': '-4rem',
      },
      mt: {
        '-16': '-4rem',
      },
      colors: {
        'brown': '#964B00',
        'footer': '#3E496C',
        'social': '#2F4858',
      },
      maxWidth: {
        'max-w-screen-2xl': '1400px'
      },
      fontFamily: {
        'display': ['Quicksand'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
