import React, { useState, useEffect } from 'react';
import { Droplet, Gauge, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CarList() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://zb-qhvz.onrender.com/api/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (carId, category) => {
    // Save selected category to localStorage
    localStorage.setItem('selectedCategory', category);

    // Navigate to detail page
    navigate(`/car/${carId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Cars</h1>
          <p className="text-gray-600">Choose your perfect ride from our collection</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map(car => (
            <div 
              key={car._id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="bg-gray-100 rounded-xl p-6 mb-4 flex items-center justify-center">
                <img 
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-24 object-contain"
                />
              </div>

              <h3 className="font-bold text-lg mb-1">{car.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{car.category}</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-purple-600">${car.pricePerDay}</span>
                <span className="text-xs text-gray-500">per day</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Gauge size={14} />
                  <span>{car.gearBox}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplet size={14} />
                  <span>{car.fuel}</span>
                </div>
                {car.airConditioner && (
                  <div className="flex items-center gap-1">
                    <Wind size={14} />
                    <span>AC</span>
                  </div>
                )}
              </div>

              <button 
                onClick={() => handleViewDetails(car._id, car.category)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {cars.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
