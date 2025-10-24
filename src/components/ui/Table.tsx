import * as React from 'react'
import { cn } from '@/utils/cn'

// --- Componente <Table> (Wrapper Principal) ---
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  // Adiciona scroll horizontal se necessário em telas menores
  <div className="relative w-full overflow-auto"> 
    <table
      ref={ref}
      // Estilos base da tabela
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

// --- Componente <TableHeader> ---
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  // Estilo do cabeçalho (fundo, etc.) - Adaptado do seu protótipo
  <thead 
    ref={ref} 
    className={cn('[&_tr]:border-b border-border bg-secondary-bg/50', className)}
    {...props} 
  />
))
TableHeader.displayName = 'TableHeader'

// --- Componente <TableBody> ---
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  // Estilo do corpo da tabela (divisão entre linhas)
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0 divide-y divide-border', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

// --- Componente <TableRow> ---
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  // Estilo da linha (hover) - Adaptado do seu protótipo
  <tr
    ref={ref}
    className={cn(
      'border-b border-border transition-colors hover:bg-secondary-bg/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

// --- Componente <TableHead> (Célula do Cabeçalho) ---
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  // Estilo da célula do cabeçalho - Adaptado do seu protótipo
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-text-muted uppercase tracking-wider',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

// --- Componente <TableCell> (Célula do Corpo) ---
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle text-text-dark', className)}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

// --- Componente <TableCaption> (Opcional) ---
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-text-muted', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

// Exporta todos os componentes
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}