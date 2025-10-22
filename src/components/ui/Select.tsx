import * as React from 'react'
import { cn } from '@/utils/cn'

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
        // TODO: Adicionar quaisquer outras propriedades específicas do Select aqui
    }
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children,...props }, ref) => {
        return (
            <div className="relative">
                <select
                    className={cn(
                        // --- Estilos Base (Similares ao Input) ---
                        'flex h-10 w-full appearance-none rounded-md border bg-transparent py-2 pl-3 pr-8 text-sm', // appearance-none remove o estilo padrão
                        'border-input', // Nosso token de borda
                        'text-foreground', // Nosso token de texto
                        
                        // Estilos de Foco (Iguais ao Input/Textarea)
                        'focus:outline-none focus:ring-2 focus:ring-offset-2',
                        'focus:ring-primary', // Anel Roxo
                        'focus:ring-offset-background',

                        // Estilos de Desabilitado
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        // --- Fim dos Estilos Base ---

                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                {/* 4. Adiciona um ícone de seta customizado (Chevron Down) */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                    <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        )
    }
)
Select.displayName = 'Select'

export { Select }