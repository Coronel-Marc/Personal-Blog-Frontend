import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

// 1. Define as variantes de estilo usando CVA
const badgeVariants = cva(
  // --- Estilos Base ---
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      // --- Prop: "variant" ---
      variant: {
        // Variante Padrão (usa cores secundárias)
        default:
          'border-transparent bg-secondary text-secondary-foreground',
          
        // Variante Primária (usa accent-neon/roxo)
        primary:
          'border-transparent bg-primary text-primary-foreground', // Adaptação: Usa primary (accent-neon)
          
        // Variante Secundária (igual ao default, mas explícito)
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',

        // Variante Destrutiva (vermelho)
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
          
        // Variante Outline (apenas borda da cor de texto)
        outline: 'text-foreground', // Usa a cor de texto padrão

        // --- Novas Variantes para Status ---
        // Baseado nas cores do seu protótipo
        // Usaremos verde para 'Published' e amarelo/laranja para 'Draft'
        success: // Para 'Published'
          'border-transparent bg-green-500/20 text-green-400 dark:bg-green-500/20 dark:text-green-400', // Cores fixas para clareza
        warning: // Para 'Draft'
           'border-transparent bg-yellow-500/20 text-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400', // Cores fixas para clareza
      },
    },
    defaultVariants: {
      variant: 'default', // Define 'default' como padrão
    },
  }
)

// 2. Define as props do componente
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, // É um div, não um botão
    VariantProps<typeof badgeVariants> {}

// 3. O Componente (sem forwardRef, pois geralmente não é necessário para Badge)
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} 
      {...props} 
    /> // Passa children e outras props HTML
  )
}

export { Badge, badgeVariants }