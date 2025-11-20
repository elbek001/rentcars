import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Calendar, Car, Home, MapPin } from "lucide-react";
import { GrBucket } from "react-icons/gr";



const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-zinc-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-10 h-[calc(100vh-5rem)] w-60 bg-gray-200 text-black flex flex-col rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-bold mb-6 text-center">Admin Panel</h2>

        <nav className="flex flex-col space-y-2 text-sm">


            
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/admin/cars"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Car size={18} />
            Cars
          </NavLink>

          <NavLink
            to="/admin/regions"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <MapPin size={18} />
            Regions
          </NavLink>

          <NavLink
            to="/admin/booking"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Calendar size={18} />
            Booking
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Home size={18} />
            Ortga qaytish  
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-55 p-3 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
