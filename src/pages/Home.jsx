import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Gauge,
  Fuel,
  Snowflake,
  Car,
  Users,
  Calendar,
  GaugeCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [form, setForm] = useState({
    carType: "",
    placeOfRental: "",
    placeOfReturn: "",
    rentalDate: "",
    returnDate: "",
    phoneNumber: "",
  });

  const [cars, setCars] = useState([]);
  const [regions, setRegions] = useState([]); // ✅ yangi: regionlar uchun state
  const navigate = useNavigate();

  // ✅ 1. LocalStorage’dan formni olish
  useEffect(() => {
    const savedForm = localStorage.getItem("bookingForm");
    if (savedForm) setForm(JSON.parse(savedForm));
  }, []);

  // ✅ 2. Form o‘zgarishlarini boshqarish
  const handleChange = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
    localStorage.setItem("bookingForm", JSON.stringify(updatedForm));
  };

  // ✅ 3. Mashinalarni olish
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

  // ✅ 4. Regionlarni API dan olish
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await axios.get("https://zb-qhvz.onrender.com/api/regions");
        setRegions(res.data);
      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
    fetchRegions();
  }, []);

  // ✅ 5. Booking yuborish
  const handleBooking = async () => {
    try {
      const res = await axios.post(
        "https://zb-qhvz.onrender.com/api/booking",
        form
      );
      alert("✅ Car booked successfully!");
      console.log("Booking success:", res.data);

      localStorage.removeItem("bookingForm");
      setForm({
        carType: "",
        placeOfRental: "",
        placeOfReturn: "",
        rentalDate: "",
        returnDate: "",
        phoneNumber: "",
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Failed to book car. Try again.");
    }
  };

  const visibleCars = cars.slice(0, 6);

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative rounded-3xl overflow-hidden text-white p-10 flex flex-col md:flex-row items-center justify-between mt-10 mx-17"
        style={{
          background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
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
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-md transition">
            View all cars
          </button>
        </div>

        {/* BOOKING FORM */}
        <div className="bg-white text-black rounded-2xl shadow-lg p-6 w-full max-w-sm mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold text-center mb-5">
            Book your car
          </h2>

          <div className="space-y-4">
            {/* Car type */}
             <select
              value={form.carType}
              onChange={(e) => handleChange("carType", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                {cars.length === 0 ? "Loading..." : "Car type"}
              </option>
              {cars.map((car) => (
                <option key={car._id || car.id} value={car.name}>
                  {car.name}
                </option>
              ))}
            </select>

            {/* Place of rental */}
            <select
              value={form.placeOfRental}
              onChange={(e) => handleChange("placeOfRental", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                {regions.length === 0 ? "Loading..." : "Place of rental"}
              </option>
              {regions.map((region) => (
                <option key={region._id || region.id} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>

            {/* Place of return */}
            <select
              value={form.placeOfReturn}
              onChange={(e) => handleChange("placeOfReturn", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                {regions.length === 0 ? "Loading..." : "Place of return"}
              </option>
              {regions.map((region) => (
                <option key={region._id || region.id} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>

            {/* Dates */}
            <input
              type="date"
              value={form.rentalDate}
              onChange={(e) => handleChange("rentalDate", e.target.value)}
              className="w-full bg-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              value={form.returnDate}
              onChange={(e) => handleChange("returnDate", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="+998901234567"
              value={form.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            />

            {/* Submit */}
            <button
              onClick={handleBooking}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Book now
            </button>
          </div>
        </div>
      </section>

      {/* CARS SECTION */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl mx-6 font-bold text-gray-900">
            Choose the car that <br /> suits you
          </h2>
          <Link
            to="/cars"
            className="text-sm font-semibold text-gray-700 hover:text-black flex items-center gap-1 mx-10"
          >
            View ALL →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {visibleCars.map((car) => (
            <div
              key={car._id}
              className="rounded-2xl bg-slate-100 hover:shadow-lg transition-all duration-300 w-[400px] mx-auto p-5 flex flex-col"
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
                  <p className="text-indigo-700 font-bold text-lg">
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
                className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-2 rounded-xl transition-all duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ FACTS IN NUMBERS */}
      <section
        className="text-white py-20 px-6 md:px-15 rounded-3xl mt-10 mx-18"
        style={{
          background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
        }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Facts In Numbers</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien
            bibendum ullamcorper in. Diam tincidunt tincidunt erat at semper
            fermentum.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 justify-center">
          {[
            { icon: Car, title: "540+", subtitle: "Cars" },
            { icon: Users, title: "20k+", subtitle: "Customers" },
            { icon: Calendar, title: "25+", subtitle: "Years" },
            { icon: GaugeCircle, title: "20m+", subtitle: "Miles" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-2xl flex items-center justify-center p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="bg-yellow-500 p-4 rounded-xl mr-4">
                <item.icon className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
