import {Outlet} from 'react-router-dom';

export const AdminLayout = () => {
    return (
        <div>
            <aside> Menu Admin </aside>

            <main>
                <Outlet />
            </main>
        </div>
    )
}