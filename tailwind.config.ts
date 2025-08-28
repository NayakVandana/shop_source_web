import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
   safelist: [
    'bg-white', 'text-gray-900', 'bg-blue-500', 'hover:bg-blue-600', 'text-white',
    'border-blue-500', 'bg-gray-100', 'font-normal', 'text-base',
    'bg-gray-900', 'text-gray-100', 'bg-blue-700', 'hover:bg-blue-800',
    'border-blue-700', 'bg-gray-800', 'font-medium',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
       colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
        },
      },
    },
  },
  plugins: [],
  
}
export default config
