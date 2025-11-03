import * as React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, X } from 'lucide-react'

interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export const AlertDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  }: AlertDialogProps) => {
  if (!isOpen) {
    return null
  }

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
     if (e.target === e.currentTarget) {
       onClose();
     }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/80 p-4 transition-opacity duration-300"
      onClick={handleBackgroundClick} 
      aria-labelledby="alert-dialog-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Container do Modal */}
      <div className="w-full max-w-sm rounded-xl bg-secondary-bg shadow-2xl transition-colors duration-500 border border-border">
        {/* Cabeçalho */}
        <div id="modalHeader" className="flex items-center justify-between rounded-t-xl bg-destructive px-6 py-4 font-bold text-xl text-destructive-foreground transition-colors duration-500">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6" aria-hidden="true" /> {/* Ícone de Alerta */}
            <span id="alert-dialog-title">{title}</span>
          </div>
          {/* Botão de Fechar */}
           <button onClick={onClose} className="text-destructive-foreground/70 hover:text-destructive-foreground">
               <X className="w-6 h-6" />
           </button>
        </div>
        
        {/* Corpo da Mensagem */}
        <div className="p-6">
          <p id="alert-dialog-description" className="mb-6 text-text-dark">
            {message}
          </p>
          {/* Botões de Ação */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}