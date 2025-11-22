import React, { useState, useEffect } from "react";
import axios from "axios";
import { Gauge, Fuel, Snowflake } from "lucide-react";
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
  const [regions, setRegions] = useState([]);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const navigate = useNavigate();

  // Load form from localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem("bookingForm");
    if (savedForm) setForm(JSON.parse(savedForm));
  }, []);

  const handleChange = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
    localStorage.setItem("bookingForm", JSON.stringify(updatedForm));
  };

  // Fetch cars
  useEffect(() => {
    axios
      .get("https://zb-qhvz.onrender.com/api/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  // Fetch regions
  useEffect(() => {
    axios
      .get("https://zb-qhvz.onrender.com/api/regions")
      .then((res) => setRegions(res.data))
      .catch((err) => console.error("Error fetching regions:", err));
  }, []);

  const handleBooking = async () => {
    const { carType, placeOfRental, placeOfReturn, rentalDate, returnDate, phoneNumber } = form;

    if (!carType || !placeOfRental || !placeOfReturn || !rentalDate || !returnDate || !phoneNumber) {
      alert("❌ Fill all fields");
      return;
    }

    const rental = new Date(rentalDate);
    const ret = new Date(returnDate);
    if (ret < rental) {
      alert("❌ Return date must be after rental");
      return;
    }

    const selectedCar = cars.find((c) => c._id === carType);
    if (!selectedCar) {
      alert("❌ Car not found");
      return;
    }

    const days = Math.ceil((ret - rental) / (1000 * 60 * 60 * 24));
    const incomeAmount = Number(selectedCar.pricePerDay) * days;

    if (isNaN(incomeAmount)) {
      alert("❌ Car pricePerDay invalid! Check backend.");
      return;
    }

    const year = rental.getFullYear();
    const month = rental.getMonth() + 1;
    const day = rental.getDate();

    try {
      setLoadingBooking(true);

      // Create booking
      await axios.post("https://zb-qhvz.onrender.com/api/booking", {
        carType,
        placeOfRental,
        placeOfReturn,
        rentalDate: rental.toISOString(),
        returnDate: ret.toISOString(),
        phoneNumber,
      });

      // Check income record
      let income = null;
      try {
        const res = await axios.get(`https://zb-qhvz.onrender.com/api/income/${year}/${month}/${day}`);
        income = res.data;
      } catch (err) {
        income = null;
      }

      if (income?._id) {
        await axios.put(`https://zb-qhvz.onrender.com/api/income/${income._id}`, {
          totalIncome: income.totalIncome + incomeAmount,
        });
      } else {
        await axios.post("https://zb-qhvz.onrender.com/api/income", {
          year,
          month,
          day,
          totalIncome: incomeAmount,
        });
      }

      alert("✅ Booking and income recorded!");
      setForm({
        carType: "",
        placeOfRental: "",
        placeOfReturn: "",
        rentalDate: "",
        returnDate: "",
        phoneNumber: "",
      });
      localStorage.removeItem("bookingForm");
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Booking failed. Check console.");
    } finally {
      setLoadingBooking(false);
    }
  };

  const visibleCars = cars.slice(0, 6);

  return (
    <div>

      {/* HERO SECTION */}
      <section
        className="relative rounded-3xl overflow-hidden text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between mt-10 mx-4 sm:mx-10 md:mx-16"
        style={{ background: "linear-gradient(135deg, #4e54c8, #8f94fb)" }}
      >
        <div className="max-w-lg md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Experience the road <br /> like never before
          </h1>
          <p className="text-white/80 mb-6 text-sm sm:text-base">
            Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida.
          </p>
          <button
            onClick={() => navigate("/cars")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-md transition"
          >
            View all cars
          </button>
        </div>

        {/* BOOKING FORM */}
        <div className="bg-white text-black rounded-2xl shadow-lg p-6 w-full max-w-md mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold text-center mb-5">Book your car</h2>
          <div className="space-y-4">

            {/* Car select */}
            <select
              value={form.carType}
              onChange={(e) => handleChange("carType", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3"
            >
              <option value="">{cars.length === 0 ? "Loading..." : "Car type"}</option>
              {cars.map((car) => (
                <option key={car._id} value={car._id}>{car.name}</option>
              ))}
            </select>

            {/* Region selections */}
            <select
              value={form.placeOfRental}
              onChange={(e) => handleChange("placeOfRental", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3"
            >
              <option value="">{regions.length === 0 ? "Loading..." : "Place of rental"}</option>
              {regions.map((region) => (
                <option key={region._id} value={region.name}>{region.name}</option>
              ))}
            </select>

            <select
              value={form.placeOfReturn}
              onChange={(e) => handleChange("placeOfReturn", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3"
            >
              <option value="">{regions.length === 0 ? "Loading..." : "Place of return"}</option>
              {regions.map((region) => (
                <option key={region._id} value={region.name}>{region.name}</option>
              ))}
            </select>

            {/* Dates */}
            <input
              type="date"
              value={form.rentalDate}
              onChange={(e) => handleChange("rentalDate", e.target.value)}
              className="w-full bg-gray-100 rounded-xl p-3"
            />

            <input
              type="date"
              value={form.returnDate}
              onChange={(e) => handleChange("returnDate", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="+998901234567"
              value={form.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3"
            />

            {/* Submit */}
            <button
              onClick={handleBooking}
              disabled={loadingBooking}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
            >
              {loadingBooking ? "Booking..." : "Book now"}
            </button>
          </div>
        </div>
      </section>

      {/* CARS SECTION */}
      <section className="px-4 sm:px-8 md:px-12 py-20 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sm:gap-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left">
            Choose the car that <br /> suits you
          </h2>
          <Link to="/cars" className="text-sm font-semibold text-gray-700 hover:text-black">
            View ALL →
          </Link>
        </div>

        {/* Cars grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 justify-center">
          {visibleCars.map((car) => (
            <div
              key={car._id}
              className="rounded-2xl bg-slate-100 hover:shadow-lg transition-all duration-300 w-full max-w-sm mx-auto p-5 flex flex-col"
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
                  <h3 className="text-lg font-semibold text-gray-900">{car.brand}</h3>
                  <p className="text-sm text-gray-500">{car.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-700 font-bold text-lg">${car.pricePerDay}</p>
                  <p className="text-gray-500 text-xs">per day</p>
                </div>
              </div>

              {/* Features */}
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
    </div>
  );
};

export default Home;
