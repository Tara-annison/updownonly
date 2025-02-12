/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'pixel': ['"Press Start 2P"', 'cursive'],
        },
        animation: {
          'bounce-slow': 'bounce 2s infinite',
          'fadeIn': 'fadeIn 0.5s ease-in',
          'gradient': 'gradient 3s ease infinite',
          'particle': 'particle 3s ease-in-out infinite',
          'spin-slow': 'spin 20s linear infinite',
        },
        keyframes: {
          orbit: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          gradient: {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center'
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center'
            }
          },
          particle: {
            '0%': {
              transform: 'translateY(0) scale(1)',
              opacity: '1'
            },
            '100%': {
              transform: 'translateY(-100px) scale(0)',
              opacity: '0'
            }
          }
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        }
      },
    },
    plugins: [],
  }