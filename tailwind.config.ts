import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  			serif: ['var(--font-serif)', 'Georgia', 'serif'],
  		},
  		letterSpacing: {
  			editorial: '-0.06em',
  		},
  		colors: {
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
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
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
  			},
  			'rose-gold': {
  				50: '#fef1f6',
  				100: '#fde4ee',
  				200: '#fcc9de',
  				300: '#fa9ec3',
  				400: '#f5639e',
  				500: '#E1306C',
  				600: '#c91f58',
  				700: '#ab1847',
  				800: '#8d163c',
  				900: '#771636',
  			},
  			champagne: {
  				50: '#f5f0fa',
  				100: '#ece2f6',
  				200: '#dac6ee',
  				300: '#c19fe2',
  				400: '#9B30FF',
  				500: '#833AB4',
  				600: '#6e2e9a',
  				700: '#5c257f',
  				800: '#4d2068',
  				900: '#411c57',
  			},
  			burgundy: {
  				50: '#f3f1f9',
  				100: '#e8e4f3',
  				200: '#d3cce8',
  				300: '#b4a7d7',
  				400: '#9079c2',
  				500: '#7352ad',
  				600: '#5f3e93',
  				700: '#503379',
  				800: '#1a1a2e',
  				900: '#0d0d1a',
  			},
  			'warm-blush': '#F0E6F6',
  			'warm-cream': '#FAFAFA',
  			'dark-chocolate': '#262626',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'purple-glow': '0 0 30px rgba(131, 58, 180, 0.3)',
  			'purple-glow-lg': '0 0 50px rgba(131, 58, 180, 0.4)',
  			'pink-glow': '0 0 30px rgba(225, 48, 108, 0.3)',
  		},
  		animation: {
  			float: 'float 20s ease-in-out infinite',
  			'float-delayed': 'float 25s ease-in-out infinite 5s',
  			'float-slow': 'float 30s ease-in-out infinite 10s',
  			'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
  			shimmer: 'shimmer 3s linear infinite',
  			marquee: 'marquee 30s linear infinite',
  			'insta-pulse': 'instaPulse 4s ease-in-out infinite',
  			'insta-float': 'instaFloat 15s ease-in-out infinite',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  				'33%': { transform: 'translate(30px, -30px) scale(1.05)' },
  				'66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
  			},
  			pulseGlow: {
  				'0%, 100%': { opacity: '0.5' },
  				'50%': { opacity: '0.8' },
  			},
  			shimmer: {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' },
  			},
  			marquee: {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-50%)' },
  			},
  			instaPulse: {
  				'0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
  				'50%': { transform: 'scale(1.1)', opacity: '0.7' },
  			},
  			instaFloat: {
  				'0%': { transform: 'translateY(100%) translateX(0)', opacity: '0' },
  				'10%': { opacity: '0.6' },
  				'90%': { opacity: '0.6' },
  				'100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
  			},
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
