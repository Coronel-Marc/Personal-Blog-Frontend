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
          'border-transparent bg-primary text-primary-foreground', 
          
        // Variante Secundária (igual ao default, mas explícito)
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',

        // Variante Destrutiva (vermelho)
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
          
        // Variante Outline (apenas borda da cor de texto)
        outline: 'text-foreground',

        // --- Novas Variantes para Status ---
        success: // Para 'Published'
          'border-transparent bg-green-500/20 text-green-400 dark:bg-green-500/20 dark:text-green-400',
        warning: // Para 'Draft'
           'border-transparent bg-yellow-500/20 text-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} 
      {...props} 
    /> 
  )
}

export { Badge, badgeVariants }