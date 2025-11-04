import { MapPin, Mail, Phone, Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" text-gray-900">
      {/* ===== Top Brand Logos ===== */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-20                                py-10 rounded-2xl bg-gray-50">
        {["toyota", "ford", "mercedes", "jeep", "bmw", "audi"].map((brand) => (
          <div key={brand} className="w-20 opacity-90">
            <img
              src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${brand}.svg`}
              alt={brand}
              className="w-full h-auto invert-0"
            />
          </div>
        ))}
      </div>

      {/* ===== Footer Content ===== */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        {/* Left section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Car className="w-6 h-6" />
            <h2 className="font-semibold text-lg">Car Rental</h2>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Faucibus faucibus pellentesque dictum turpis. Id pellentesque turpis
            massa a id iaculis lorem t...
          </p>
          <div className="flex space-x-4 text-gray-600">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold mb-4">Address</h3>
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-4 h-4 text-orange-500" />
            <p>Oxford Ave. Cary, NC 27511</p>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <Mail className="w-4 h-4 text-orange-500" />
            <p>nwiger@yahoo.com</p>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-orange-500" />
            <p>+537 547-6401</p>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-orange-500">About us</a></li>
            <li><a href="#" className="hover:text-orange-500">Contact us</a></li>
            <li><a href="#" className="hover:text-orange-500">Gallery</a></li>
            <li><a href="#" className="hover:text-orange-500">Blog</a></li>
            <li><a href="#" className="hover:text-orange-500">F.A.Q</a></li>
          </ul>
        </div>

        {/* Vehicles + App Download */}
        <div>
          <h3 className="font-semibold mb-4">Vehicles</h3>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>Sedan</li>
            <li>Cabriolet</li>
            <li>Pickup</li>
            <li>Minivan</li>
            <li>SUV</li>
          </ul>

          <h3 className="font-semi bold mb-3">Download App</h3>
          <div className="flex flex-col gap-2">
            <div className="w-[150px]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
              alt="App Store"
              className="h-10"
            />
            </div>
            <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bottom copyright ===== */}
      <div className="border-t border-gray-200 mt-6 py-4 text-center text-gray-500 text-xs">
        © Copyright Car Rental 2024. Design by Figma.guru
      </div>
    </footer>
  );
}
