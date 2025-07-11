/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006600',
          dark: '#004d00',
          light: '#00cc00',
        },
        pakistani: {
          green: '#006600',
          'green-dark': '#004d00',
          'green-light': '#00cc00',
        }
      },
      fontFamily: {
        'noto-nastaliq': ['Noto Nastaliq Urdu', 'serif'],
        'jameel': ['Jameel Noori Nastaleeq', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'urdu-sm': ['16px', '1.6'],
        'urdu-base': ['18px', '1.8'],
        'urdu-lg': ['20px', '2'],
        'urdu-xl': ['24px', '2.2'],
        'urdu-2xl': ['28px', '2.4'],
      },
      spacing: {
        'urdu': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-green': 'pulseGreen 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 102, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(0, 102, 0, 0)' },
        }
      },
    },
  },
  plugins: [],
}