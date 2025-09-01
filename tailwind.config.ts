import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff0080",
        secondary: "#00f5ff", 
        tertiary: "#39ff14",
        accent: "#ffff00",
        dark: "#0a0a0a",
        light: "#ffffff",
        surface: "#1a1a1a",
        neon: {
          cyan: "#00f5ff",
          magenta: "#ff00ff",
          yellow: "#ffff00",
          green: "#39ff14",
        },
        electric: {
          blue: "#0066ff",
          purple: "#8a2be2",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'cyber-glow': 'cyberGlow 3s ease-in-out infinite',
        'hologram': 'hologram 4s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'slide-up': 'slideUpStagger 0.8s ease-out forwards',
        'data-stream': 'dataStream 2s linear infinite',
        'matrix-rain': 'matrixRain 10s linear infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 20px #ff0080, 0 0 40px #ff0080, 0 0 60px #ff0080' },
          '50%': { boxShadow: '0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080' },
        },
        cyberGlow: {
          '0%, 100%': { boxShadow: '0 0 30px #00f5ff', borderColor: '#00f5ff' },
          '50%': { boxShadow: '0 0 60px #00f5ff', borderColor: '#00f5ff' },
        },
        hologram: {
          '0%, 100%': { opacity: '1', filter: 'hue-rotate(0deg)' },
          '25%': { opacity: '0.8', filter: 'hue-rotate(90deg)' },
          '50%': { opacity: '1', filter: 'hue-rotate(180deg)' },
          '75%': { opacity: '0.9', filter: 'hue-rotate(270deg)' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-2px)' },
          '20%': { transform: 'translateX(2px)' },
          '30%': { transform: 'translateX(-1px)' },
          '40%': { transform: 'translateX(1px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;