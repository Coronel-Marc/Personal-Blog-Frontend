import * as React from 'react'
import { cn } from '@/utils/cn'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(

                    // --- Estilos Base (Adaptados do Input, mas sem altura fixa 'h-10') ---
                    'flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm',
                    'border-input',
                    'text-foreground',
                    'placeholder:text-secondary-foreground',

                    // Estilos de Foco (Iguais ao Input)
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'focus-visible:ring-primary', 
                    'focus-visible:ring-offset-background',

                    
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    // --- Fim dos Estilos Base ---
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }