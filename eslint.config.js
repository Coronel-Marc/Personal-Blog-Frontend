import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// --- NOSSAS ADIÇÕES ---
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import prettierConfig from 'eslint-config-prettier'
// ---------------------

export default defineConfig([
  globalIgnores(['dist']), // Ignora a pasta 'dist'
  {
    files: ['**/*.{ts,tsx}'], // Aplica estas regras a arquivos TS e TSX
    
    // 'extends' agora é um array de objetos de configuração importados
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,

      // --- NOSSAS ADIÇÕES ---
      tailwindPlugin.configs.recommended, // Configuração recomendada do Tailwind
      prettierConfig, // Desliga regras de estilo (DEVE SER O ÚLTIMO)
      // ---------------------
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // --- NOSSA ADIÇÃO (REGRAS) ---
    // Mesmo no formato "flat", ainda podemos definir regras
    rules: {
      // Força a ordenação de classes do Tailwind
      'tailwindcss/classnames-order': 'warn', 
      // Desliga a regra 'only-export-components' do vite/react-refresh
      'react-refresh/only-export-components': 'warn',
    },
    // ---------------------------
  },
])