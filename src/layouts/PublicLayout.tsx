import { Outlet } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export const PublicLayout = () => {
    return (
        <div>
            <Header />

            <main className="flex-grow">
                {/* Onde o React-router vai renderizar as rotas filhas */}
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}