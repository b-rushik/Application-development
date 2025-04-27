/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6EEF4',
          100: '#CCDDE9',
          200: '#99BBD3',
          300: '#6699BD',
          400: '#3377A7',
          500: '#0F4C81', // Primary
          600: '#0C3D67',
          700: '#092E4E',
          800: '#061F34',
          900: '#030F1A',
        },
        secondary: {
          50: '#FFF2EE',
          100: '#FFE5DD',
          200: '#FFCBBB',
          300: '#FFB199',
          400: '#FF9777',
          500: '#FF7F50', // Secondary
          600: '#CC6540',
          700: '#994C30',
          800: '#663220',
          900: '#331910',
        },
        accent: {
          50: '#EFF9FC',
          100: '#DFF3F9',
          200: '#BFE7F3',
          300: '#9FDBEE',
          400: '#7FD0E8',
          500: '#63C5DA', // Accent
          600: '#4E9EAE',
          700: '#3A7783',
          800: '#275057',
          900: '#13282C',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        gray: {
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
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};