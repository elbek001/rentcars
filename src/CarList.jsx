import React, { useState, useEffect } from 'react';
import { Settings, Droplet, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gearbox from '../assets/gearbox.svg'

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold mb-8">Available Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map(car => (
            <div key={car.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className=" rounded-xl p-6 mb-4">
                  <img 
                    src={car.imageUrl} 
                    alt={car.name}
                    className="w-full h-32 object-contain"
                  />
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{car.brand}</h3>
                    <p className="text-gray-500 text-sm">{car.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-600">${car.pricePerDay}</div>
                    <div className="text-xs text-gray-500">per day</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <img className='w-[20px] h-[15.220338821411133px]' src={gearbox} alt="" />
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
                  onClick={() => navigate(`/view-detail/${car._id}`)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}