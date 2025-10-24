import {Outlet} from 'react-router-dom';
import { AdminHeader } from '@/components/shared/AdminHeader'

export const AdminLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <AdminHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}