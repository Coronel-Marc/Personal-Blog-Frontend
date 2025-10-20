import {createBrowserRouter, RouterProvider} from "react-router-dom";

import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

import { ProtectedRoute } from "@/routes/ProtectedRoute";

import { HomePage } from "@/pages/public/HomePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { PostPage } from "@/pages/public/PostPage";
import { NotFoundPage } from "@/pages/public/NotFoundPage";
import { PortfolioPage } from "@/pages/public/PortfolioPage";

import { LoginPage } from "@/pages/admin/LoginPage";
import { DashboardPage } from "@/pages/admin/DashboardPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'post/:slug',
                element: <PostPage />
            },
        ]
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />
            }
            // TODO: Adicionar outras rotas admin aqui
        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    },
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}