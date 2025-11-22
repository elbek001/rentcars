import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Calendar, Car, Home, MapPin, Menu } from "lucide-react";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-zinc-100">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow p-3 flex items-center justify-between z-50">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <Menu size={28} onClick={() => setOpen(true)} className="active:scale-95" />
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 md:top-10 left-0 h-screen md:h-[calc(100vh-5rem)] 
          w-60 bg-gray-200 text-black flex flex-col rounded-r-xl p-4 shadow-md
          transform transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close button only on mobile */}
        <div className="md:hidden flex justify-end">
          <button
            className="text-xl mb-4"
            onClick={() => setOpen(false)}
          >
            ✖
          </button>
        </div>

        <h2 className="text-lg font-bold mb-6 text-center hidden md:block">
          Admin Panel
        </h2>

        <nav className="flex flex-col space-y-2 text-sm">

          <NavLink
            to="/admin/home"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Home size={18} /> Home
          </NavLink>

          <NavLink
            to="/admin/cars"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Car size={18} /> Cars
          </NavLink>

          <NavLink
            to="/admin/regions"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <MapPin size={18} /> Regions
          </NavLink>

          <NavLink
            to="/admin/booking"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Calendar size={18} /> Booking
          </NavLink>

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-400 transition ${
                isActive ? "bg-zinc-300" : ""
              }`
            }
          >
            <Home size={18} /> Ortga qaytish
          </NavLink>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-60 p-4 mt-14 md:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
