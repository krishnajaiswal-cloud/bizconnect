export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D9E75',
          50: '#f0faf7',
          100: '#d4f0e8',
          500: '#1D9E75',
          600: '#168d65',
        },
        score: {
          high: '#1D9E75',
          medium: '#BA7517',
          low: '#A32D2D',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
