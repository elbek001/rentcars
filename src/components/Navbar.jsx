import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/vehicles", label: "Vehicles" },
    { path: "/details", label: "Details" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="flex justify-between items-center px-10 py-4 mx-10 ">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <img src="../src/assets/Logo.png" alt="logo" className="w- h-10" />
      </div>

      {/* Middle - Links */}
      <ul className="flex gap-8 text-sm font-medium">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "font-semibold text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right - Contact */}
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 p-2 rounded-full text-white">
          <Phone size={16} />
        </div>
        <div>
          <p className="text-xs text-gray-500">Need help?</p>
          <p className="text-sm font-semibold">+996 247-1680</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
