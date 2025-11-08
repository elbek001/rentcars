import React from "react";
import { Car, MapPin, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black md:px-20 py-30 border-gray-200">
      {/* 🔹 Yuqori qism */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

        {/* 1️⃣ Logo va Social */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Car className="text-black" size={28} />
            <h2 className="text-lg font-semibold">Car Rental</h2>
          </div>

          <p className="text-gray-800 font-semibold leading-snug mb-6">
            Faucibus faucibus <br />
            pellentesque dictum turpis. <br />
            Id pellentesque turpis <br />
            massa a id iaculis lorem t...
          </p>

          <div className="flex items-center gap-5">
            <FaFacebookF className="text-black cursor-pointer hover:opacity-70" size={18} />
            <FaInstagram className="text-black cursor-pointer hover:opacity-70" size={18} />
            <FaTwitter className="text-black cursor-pointer hover:opacity-70" size={18} />
            <FaYoutube className="text-black cursor-pointer hover:opacity-70" size={18} />
          </div>
        </div>

        {/* 2️⃣ Address + Useful Links */}
        <div className="flex flex-col gap-6">
          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="bg-yellow-500 p-2 rounded-full">
              <MapPin className="text-white" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-semibold">Oxford Ave. Cary, NC 27511</p>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold mb-3">Useful links</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li className="hover:text-black cursor-pointer">About us</li>
              <li className="hover:text-black cursor-pointer">Contact us</li>
              <li className="hover:text-black cursor-pointer">Gallery</li>
              <li className="hover:text-black cursor-pointer">Blog</li>
              <li className="hover:text-black cursor-pointer">F.A.Q</li>
            </ul>
          </div>
        </div>

        {/* 3️⃣ Email + Vehicles */}
        <div className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Mail className="text-white" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">nwiger@yahoo.com</p>
            </div>
          </div>

          {/* Vehicles */}
          <div>
            <h3 className="font-semibold mb-3">Vehicles</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li className="hover:text-black cursor-pointer">Sedan</li>
              <li className="hover:text-black cursor-pointer">Cabriolet</li>
              <li className="hover:text-black cursor-pointer">Pickup</li>
              <li className="hover:text-black cursor-pointer">Minivan</li>
              <li className="hover:text-black cursor-pointer">SUV</li>
            </ul>
          </div>
        </div>

        {/* 4️⃣ Phone + Download App */}
        <div className="flex flex-col gap-6">
          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Phone className="text-white" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">+537 547-6401</p>
            </div>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold mb-3">Download App</h3>
            <div className="flex flex-col gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_%28black%29_SVG.svg"
                alt="App Store"
                className="w-36 cursor-pointer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-36 cursor-pointer"
              />

              <NavLink to='/admin'>
                <button
                  className="mt-4 md:mt-0 bg-[#5E17EB] hover:bg-[#4e0fd6] text-white font-semibold py-2 px-5 rounded-lg transition"
                >
                  Admin Panel
                </button>
              </NavLink>

            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Pastki qism */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-6">
        © Copyright Car Rental 2024. Design by Figma.guru
      </div>


    </footer>
  );
};

export default Footer;
