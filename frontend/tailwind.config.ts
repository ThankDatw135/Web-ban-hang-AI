import type { Config } from 'tailwindcss';

/**
 * TailwindCSS Config - Fashion AI
 * 
 * Color Palette:
 * - Background: #FAF7F2 (kem sữa)
 * - Primary: #C7A26A (gold champagne)
 * - Accent: #A855F7 (tím cho AI)
 * - Text: #1F2937
 */

const config: Config = {
  darkMode: 'class', // Force manual dark mode control
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        cream: '#FAF7F2',
        
        // Primary - Gold Champagne
        primary: {
          DEFAULT: '#C7A26A',
          50: '#FCF8F3',
          100: '#F5EBD9',
          200: '#E8D4B4',
          300: '#DBBF90',
          400: '#D1AC7A',
          500: '#C7A26A',
          600: '#B8915A',
          700: '#A07B4A',
          800: '#7A5E39',
          900: '#5A4529',
        },
        
        // Secondary - Warm Gray
        secondary: {
          DEFAULT: '#6B7280',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        
        // Accent - Purple for AI features
        accent: {
          DEFAULT: '#A855F7',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6D28D9',
          900: '#5B21B6',
        },
        
        // Text colors
        'text-main': '#1F2937',
        'text-muted': '#6B7280',
        
        // Border
        border: '#E5E7EB',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
