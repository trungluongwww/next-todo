import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    textColor: {
      black: '#000000',
      primaryAmber: '#dc4c3e',
      gray_300: '#d1d5db',
      gray_400: '#9ca3af',
      gray_500: '#6b7280',
      gray_600: '#4b5563',
      gray_700: '#374151',
      white: '#FFFFFF',
      error: '#b91c1c'
    },
    fontFamily: {
      poPi: 'Poppins'
    }
  },
  plugins: []
};
export default config;
