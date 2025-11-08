import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Car, MapPin } from "lucide-react";

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-200 text-black flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

                <nav className="flex flex-col space-y-3">
                    <NavLink
                        to="/admin/home"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-400 transition ${isActive ? "bg-zinc-300" : ""
                            }`
                        }
                    >
                        <Car size={20} />
                        Home
                    </NavLink>


                    <NavLink
                        to="/admin/cars"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-400 transition ${isActive ? "bg-zinc-300" : ""
                            }`
                        }
                    >
                        <Car size={20} />
                        Cars
                    </NavLink>

                    <NavLink
                        to="/admin/regions"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-400 transition ${isActive ? "bg-zinc-300" : ""
                            }`
                        }
                    >
                        <MapPin size={20} />
                        Regions
                    </NavLink>
                </nav>
            </aside>

            {/* Content area */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>


        </div>
    );
};

export default AdminLayout;
