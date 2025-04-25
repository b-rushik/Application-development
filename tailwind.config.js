/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#EBF4FF',
            100: '#D1E5FF',
            200: '#A4CBFF',
            300: '#73ADFF',
            400: '#4A8CF9',
            500: '#2563EB',
            600: '#1A47B8',
            700: '#1A365D',
            800: '#152541',
            900: '#101B2E',
          },
          secondary: {
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            300: '#6EE7B7',
            400: '#34D399',
            500: '#10B981',
            600: '#047857',
            700: '#065F46',
            800: '#064E3B',
            900: '#022C22',
          },
          accent: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
          },
          success: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            500: '#22C55E',
            700: '#15803D',
          },
          warning: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            500: '#F59E0B',
            700: '#B45309',
          },
          error: {
            50: '#FEF2F2',
            100: '#FEE2E2',
            500: '#EF4444',
            700: '#B91C1C',
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
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-in': 'slideIn 0.3s ease-out',
          'bounce-light': 'bounceLight 1s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideIn: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          bounceLight: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-5px)' },
          },
        },
      },
    },
    plugins: [],
  };