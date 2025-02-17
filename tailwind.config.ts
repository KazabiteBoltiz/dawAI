import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			gray: {
  				'1': '#09090e',
  				'2': '#1a1c26',
  				'3': '#3c4851',
  				'4': '#617077'
  			},
  			white: {
  				'1': '#ffffff',
          '15': '#e1e6eb',
  				'2': '#cbd2d9',
  				'3': '#99a5a7'
  			},
  			brown: {
  				'1': '#211b21',
  				'2': '#6b5853',
  				'3': '#ab684c',
  				'4': '#cea65f',
  				'5': '#e7d494',
  				'6': '#f9f3c0'
  			},
  			muted: {
  				'1': '#24131d',
  				'2': '#402830',
  				'3': '#5e423c',
  				'4': '#806352',
  				'5': '#a19477',
  				'6': '#bdbb93',
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			red: {
  				'1': '#4c0717',
  				'2': '#810b0b',
  				'3': '#a82b12',
  				'4': '#d45c1d',
  				'5': '#e38524'
  			},
  			orange: {
  				'1': '#ebab4c',
  				'2': '#f1c256',
  				'3': '#f6dd7a'
  			},
  			bluegreen: {
  				'1': '#03121f',
  				'2': '#0f343f',
  				'3': '#1a5556',
  				'4': '#2c7d63'
  			},
  			green: {
  				'1': '#4ba245',
  				'2': '#94cc47',
  				'3': '#eaf257'
  			},
  			teal: {
  				'1': '#021017',
  				'2': '#0b3b44',
  				'3': '#17756e',
  				'4': '#30a387',
  				'5': '#50cd90',
  				'6': '#6ae291',
  				'7': '#c9e8a1'
  			},
  			blue: {
  				'1': '#17092e',
  				'2': '#151556',
  				'3': '#113f82',
  				'4': '#3466b0',
  				'5': '#71b5db',
  				'6': '#9ee4ef',
  				'7': '#d1fbf0'
  			},
  			purple: {
  				'1': '#261646',
  				'2': '#552d72',
  				'3': '#884b93',
  				'4': '#ac6ca2',
  				'5': '#c58faa',
  				'6': '#dfb2c6',
  				'7': '#edd1d6'
  			},
  			retro: {
  				'1': '#140333',
  				'2': '#461565',
  				'3': '#7b2584',
  				'4': '#a94b84',
  				'5': '#d07482',
  				'6': '#de9e8c'
  			},
  			solar: {
  				'1': '#7b0d69',
  				'2': '#a41057',
  				'3': '#c3435c',
  				'4': '#e17676',
  				'5': '#f3bfad'
  			},
  			mutedpink: {
  				'1': '#3c133b',
  				'2': '#6b2e5a',
  				'3': '#aa557c',
  				'4': '#ca867a',
  				'5': '#f2cdaa',
  				'6': '#faf8db'
  			},
  			gold: {
  				'1': '#8a4028',
  				'2': '#b3794d',
  				'3': '#dab580',
  				'4': '#f3e7a8'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
