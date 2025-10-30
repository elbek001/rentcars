import React, { useState, useEffect } from "react";
import axios from "axios";
import { Gauge, Fuel, Snowflake } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [form, setForm] = useState({
    carType: "",
    rentalPlace: "",
    returnPlace: "",
    rentalDate: "",
    returnDate: "",
  });

  const [cars, setCars] = useState([]);

  // 🔹 API’dan mashinalarni olish
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("https://zb-qhvz.onrender.com/api/cars");
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  // 🔹 LocalStorage’ga saqlash funksiyasi
  const handleSaveToLocal = (car) => {
    try {
      localStorage.setItem("selectedCar", JSON.stringify(car));
      alert(`${car.brand} muvaffaqiyatli saqlandi ✅`);
    } catch (err) {
      console.error("LocalStorage xatosi:", err);
    }
  };

  // 🔹 Faqat 6 ta mashinani chiqaramiz (agar mavjud bo‘lsa)
  const visibleCars = cars.slice(0, 6);

  const navigate = useNavigate();


  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative rounded-3xl overflow-hidden text-white p-10 flex flex-col md:flex-row items-center justify-between mt-10 mx-6"
        style={{
          backgroundColor: "#5E17EB",
          backgroundImage: `url('/your-bg-image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-lg md:w-1/2">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Experience the road <br /> like never before
          </h1>
          <p className="text-white/80 mb-6">
            Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor
            tristique et gravida. Quis nunc interdum gravida ullamcorper.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-md transition">
            View all cars
          </button>
        </div>

        {/* Booking Form */}
        <div className="bg-white text-black rounded-2xl shadow-lg p-6 w-full max-w-sm mt-8 md:mt-0">
          {/* ...form qismi o‘zgarishsiz... */}
        </div>
      </section>

      {/* Mashinalar (API’dan) */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Choose the car that <br /> suits you
          </h2>
          {/* 🔹 Link orqali boshqa sahifaga o‘tish */}
          <Link
            to="/cars"
            className="text-sm font-semibold text-gray-700 hover:text-black flex items-center gap-1"
          >
            View ALL →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {visibleCars.map((car) => (
            <div
              key={car._id}
              className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-[400px] mx-auto p-5 flex flex-col"
            >
              <div className="flex justify-center mb-3">
                <img
                  src={car.imageUrl || "/car-placeholder.png"}
                  alt={car.brand}
                  className="w-56 h-28 object-contain opacity-80"
                />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.brand}
                  </h3>
                  <p className="text-sm text-gray-500">{car.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600 font-bold text-lg">
                    ${car.pricePerDay}
                  </p>
                  <p className="text-gray-500 text-xs">per day</p>
                </div>
              </div>

              <div className="flex justify-between text-gray-600 text-sm mt-4">
                <div className="flex items-center gap-1">
                  <Gauge size={15} /> {car.gearBox}
                </div>
                <div className="flex items-center gap-1">
                  <Fuel size={15} /> {car.fuel}
                </div>
                <div className="flex items-center gap-1">
                  <Snowflake size={15} /> {car.airConditioner ? "AC" : "No AC"}
                </div>
              </div>

              <button
                onClick={() => navigate(`/details/${car._id}`)}
                className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300"
              >
                View Details
              </button>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
