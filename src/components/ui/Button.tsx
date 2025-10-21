import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  [
    // --- Estilos Base (comuns a todas as variantes) ---
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'focus-visible:ring-primary focus-visible:ring-offset-background', // Foco Roxo
  'disabled:pointer-events-none disabled:opacity-50', // Estilo desabilitado
  ],

  {
    variants: {
      // --- Prop: "variant" ---
      variant: {
        // Variante Principal (Nosso Roxo Synthwave)
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        
        // Variante Destrutiva (Nosso Rosa/Vermelho)
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        
        // Variante Secundária (Nosso Cinza-azulado)
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',

        // Variante "Fantasma" (hover sutil)
        ghost: 'hover:bg-secondary hover:text-secondary-foreground',
        
        // Variante de Link (apenas texto)
        link: 'text-primary underline-offset-4 hover:underline',
      },
      // --- Prop: "size" ---
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10', // Para botões de ícone
      },
    },
    // --- Valores Padrão ---
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
            // Adicione quaisquer outras propriedades específicas do botão aqui
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }