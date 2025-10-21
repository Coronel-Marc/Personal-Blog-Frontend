import * as React from 'react'
import { cn } from '@/utils/cn'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(

                    // --- Estilos Base (Agora com Nossos Tokens) ---
                    'flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm',
                    
                    // Cor do texto
                    'text-foreground', 
                    
                    // Cor da borda
                    'border-input', // Usa 'input: #475569'

                    // Cor do placeholder
                    'placeholder:text-secondary-foreground', // Usa 'secondary-foreground: #94a3b8'

                    // Estilos de Foco (O "Glow" Roxo)
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'focus-visible:ring-primary', // Usa 'primary: #a855f7'
                    'focus-visible:ring-offset-background', // O "offset" usa a cor de fundo

                    // Estilos de Desabilitado
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
