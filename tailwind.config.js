/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Paleta "Synthwave Dark" ---

        // 1. FUNDO (O "Céu Noturno")
        // Um cinza-azulado muito escuro. Mais rico que o preto puro.
        // É "Tech" e "Escuro".
        'background': '#0f172a', // (Tailwind 'slate-900')
        
        // 2. TEXTO (As "Luzes Claras")
        // O texto principal. Um cinza claro, para ser legível sem 
        // ser um branco puro (que cansa os olhos).
        'foreground': '#e2e8f0', // (Tailwind 'slate-200')

        // 3. PRIMÁRIA (A Cor de Ação / O "Neon")
        // Seu "Roxo". É "Ousado" e "Nostálgico".
        'primary': {
          DEFAULT: '#a855f7',     // (Tailwind 'purple-500')
          'foreground': '#ffffff', // Texto em cima do roxo
        },
        
        // 4. SECUNDÁRIA (O "Metal da Moto")
        // Para cartões e fundos sutis. Um cinza-azulado mais claro.
        // É "Orgânico" (como metal) e "Tech".
        'secondary': {
          DEFAULT: '#1e293b',     // (Tailwind 'slate-800')
          'foreground': '#94a3b8', // Texto em cima do secundário
        },

        // 5. BORDAS E INPUTS (As "Divisões")
        // Tons de cinza para linhas e inputs.
        'border': '#334155',   // (Tailwind 'slate-700')
        'input': '#475569',    // (Tailwind 'slate-600') - Um pouco mais claro

        // 6. DESTRUTIVO (O "Alerta")
        // Uma cor vibrante para erros, que combina com o neon.
        'destructive': {
          DEFAULT: '#f43f5e',     // (Tailwind 'rose-500')
          'foreground': '#ffffff',
        },
        // --- Fim da Paleta ---
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': 'calc(0.5rem - 2px)', // Ex: Borda de 2px
        'sm': 'calc(0.5rem - 4px)', // Ex: Borda de 4px
      }
    },
  },
  plugins: [],
}