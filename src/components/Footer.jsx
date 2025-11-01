import {
  Car,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-sm text-gray-700 border-t border-gray-100">
      {/* === YUQORI QATOR === */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 1: Logo, text, social */}
        <div>
          <div className="flex items-center space-x-2 mb-5">
            <Car className="w-6 h-6 text-black" />
            <span className="font-semibold text-lg text-black">Car Rental</span>
          </div>
          <div className="font-semibold text-black leading-relaxed space-y-1">
            <p>Faucibus faucibus</p>
            <p>pellentesque dictum turpis.</p>
            <p>Id pellentesque turpis</p>
            <p>massa a id iaculis lorem t...</p>
          </div>

          <div className="flex items-center space-x-3 mt-5">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-black rounded-full text-white hover:bg-gray-800 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* 2: Address */}
        <div className="flex items-start space-x-3">
          <div className="bg-amber-500 p-2 rounded-full text-white mt-1">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-700">Address</p>
            <p className="font-semibold text-black">
              Oxford Ave. Cary, NC 27511
            </p>
          </div>
        </div>

        {/* 3: Email */}
        <div className="flex items-start space-x-3">
          <div className="bg-amber-500 p-2 rounded-full text-white mt-1">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-700">Email</p>
            <p className="font-semibold text-black">nwiger@yahoo.com</p>
          </div>
        </div>

        {/* 4: Phone */}
        <div className="flex items-start space-x-3">
          <div className="bg-amber-500 p-2 rounded-full text-white mt-1">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-700">Phone</p>
            <p className="font-semibold text-black">+537 547-6401</p>
          </div>
        </div>

        {/* 5: Download App */}
        <div>
          <p className="font-semibold text-black mb-3">Download App</p>
          <div className="flex flex-col gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
              className="h-10 w-auto"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10 w-auto"
            />
          </div>
        </div>
      </div>

      {/* === PASTKI QATOR === */}
      <div className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Useful Links */}
        <div>
          <h4 className="font-semibold text-black mb-3">Useful links</h4>
          <ul className="space-y-1 text-gray-700 font-medium">
            <li><a href="#" className="hover:text-black">About us</a></li>
            <li><a href="#" className="hover:text-black">Contact us</a></li>
            <li><a href="#" className="hover:text-black">Gallery</a></li>
            <li><a href="#" className="hover:text-black">Blog</a></li>
            <li><a href="#" className="hover:text-black">F.A.Q</a></li>
          </ul>
        </div>

        {/* Vehicles */}
        <div>
          <h4 className="font-semibold text-black mb-3">Vehicles</h4>
          <ul className="space-y-1 text-gray-700 font-medium">
            <li><a href="#" className="hover:text-black">Sedan</a></li>
            <li><a href="#" className="hover:text-black">Cabriolet</a></li>
            <li><a href="#" className="hover:text-black">Pickup</a></li>
            <li><a href="#" className="hover:text-black">Minivan</a></li>
            <li><a href="#" className="hover:text-black">SUV</a></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 text-xs border-t border-gray-100 py-4">
        © Copyright Car Rental 2024. Design by Figma.guru
      </div>
    </footer>
  );
}
