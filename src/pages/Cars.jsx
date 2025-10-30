import React, { useEffect, useState } from "react";
import axios from "axios";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [showAll, setShowAll] = useState(false); // 🔹 yangi state

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

  // 🔹 View All bosilmaguncha faqat 6 ta mashina
  const visibleCars = showAll ? cars : cars.slice(0, 6);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Cars</h1>

      {/* Mashinalar ro‘yxati */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleCars.map((car) => (
          <div key={car._id} className="border rounded-xl shadow p-4">
            <img
              src={car.imageUrl}
              alt={car.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{car.name}</h2>
            <p className="text-gray-600">{car.brand}</p>
            <p className="text-green-600 font-medium">${car.pricePerDay}/day</p>
          </div>
        ))}
      </div>

      {/* 🔹 View All tugmasi */}
      {!showAll && cars.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View All →
          </button>
        </div>
      )}
    </div>
  );
};

export default Cars;
