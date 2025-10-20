import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
    return (
        <div>
            {/* TODO: Adicionar o Organimos <Header> aqui*/}
            <header> Header Publico </header>

            <main>
                {/* Onde o React-router vai renderizar as rotas filhas */}
                <Outlet />
            </main>

            {/*TODO: Adicionar o Organimos <Footer> aqui*/}
            <footer> Footer Publico </footer>
        </div>
    )
}