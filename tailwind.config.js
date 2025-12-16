/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s ease-in-out infinite',
        'orbit': 'orbit 3s linear infinite',
        'orbit-reverse': 'orbit-reverse 3s linear infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'fade': 'fade 1.5s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { 
            transform: 'translate(0)',
            textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)'
          },
          '25%': { 
            transform: 'translate(-2px, 2px)',
            textShadow: '0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.5)'
          },
          '50%': { 
            transform: 'translate(2px, -2px)',
            textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.5)'
          },
          '75%': { 
            transform: 'translate(-2px, -2px)',
            textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.5)'
          },
        },
        orbit: {
          '0%': { 
            transform: 'rotate(0deg) translateX(80px) rotate(0deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'rotate(360deg) translateX(80px) rotate(-360deg)',
            opacity: '1'
          },
        },
        'orbit-reverse': {
          '0%': { 
            transform: 'rotate(180deg) translateX(80px) rotate(-180deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'rotate(540deg) translateX(80px) rotate(-540deg)',
            opacity: '1'
          },
        },
        scan: {
          '0%, 100%': { 
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '50%': { 
            transform: 'translateY(100%)',
            opacity: '0.3'
          },
        },
        fade: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
