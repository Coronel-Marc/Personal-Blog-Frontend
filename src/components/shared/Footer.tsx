import React from 'react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-12 bg-secondary-bg py-8 transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-sm text-text-muted transition-colors duration-500">
                &copy; {currentYear} [NOME DO SEU BLOG AQUI]. Todos os direitos reservados. | Design inspirado em Synthwave.
                </p>
                {/* TODO: Adicionar links para redes sociais aqui*/}
            </div>
        </footer>
    );
}