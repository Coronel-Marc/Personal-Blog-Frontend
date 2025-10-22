/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Paleta "Synthwave Dark" ---
        'primary-bg': 'hsl(var(--primary-bg))', // Cor Primária de Fundo
        'secondary-bg': 'hsl(var(--secondary-bg))', // Cor Secundária de Fundo (cards)
        'accent-neon': 'hsl(var(--accent-neon))', // Cor de Destaque (botões, links)
        'text-dark': 'hsl(var(--text-dark))', // Cor Principal de Texto
        'text-muted': 'hsl(var(--text-muted))', // Cor de Texto Secundário/Apagado
        'danger-red': 'hsl(var(--danger-red))', // Cor para Ações Destrutivas
        
        'border': 'hsl(var(--border))',   
        'input': 'hsl(var(--input))',    
        'ring': 'hsl(var(--ring))',

        // Aliases para facilitar o uso
        'background': 'hsl(var(--primary-bg))', 
        'foreground': 'hsl(var(--text-dark))', 

        'primary': {
          DEFAULT: 'hsl(var(--accent-neon))',
          foreground: 'hsl(var(--accent-neon-foreground))', // Cor do texto em cima do accent
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary-bg))',
          foreground: 'hsl(var(--text-muted))', // Texto em cima do fundo secundário
        },
        'destructive': {
          DEFAULT: 'hsl(var(--danger-red))',
          foreground: 'hsl(var(--danger-red-foreground))', // Texto em cima do vermelho
        },
        'muted': { // Para texto ainda mais apagado
          DEFAULT: 'hsl(var(--secondary-bg))', // Fundo sutil
          foreground: 'hsl(var(--text-muted))', 
        },
        'accent': { // Um alias genérico para o neon
           DEFAULT: 'hsl(var(--accent-neon))',
           foreground: 'hsl(var(--accent-neon-foreground))',
        },
      },
      borderRadius: {
        'lg': '0.75rem', 
        'md': '0.5rem',
        'sm': '0.25rem',
      },
    },
  },
  plugins: [],
}