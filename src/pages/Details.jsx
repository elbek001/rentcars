import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const CarDetailsPage = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // SVG icons as data URLs
  const gearboxIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M12 1v6m0 6v6m5.5-11.5l-4.2 4.2m0 2.6l4.2 4.2M23 12h-6m-6 0H1m11.5 5.5l-4.2-4.2m2.6 0l4.2-4.2'/%3E%3C/svg%3E";
  const gasIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M3 22V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M7 10h4m8-3v13a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.5a2 2 0 0 0-2-2 1 1 0 0 0-1 1V12'/%3E%3C/svg%3E";
  const airIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M2 15h20M2 9h20m-10 6v6m0-18v6'/%3E%3C/svg%3E";

  useEffect(() => {
    fetch('https://zb-qhvz.onrender.com/api/cars')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data); // Debug uchun
        setCars(data);
        
        // Get car ID from URL if available, otherwise show first car
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        
        if (carId) {
          const car = data.find(c => c._id === carId || c.id === carId);
          if (car) {
            setSelectedCar(car);
          } else if (data.length > 0) {
            setSelectedCar(data[0]);
          }
        } else if (data.length > 0) {
          setSelectedCar(data[0]);
        }
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
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!selectedCar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No car found</p>
        </div>
      </div>
    );
  }

  const specs = [
    { icon: '⚙️', label: 'Gear Box', value: selectedCar.gearBox || 'N/A' },
    { icon: '⛽', label: 'Fuel', value: selectedCar.fuel || 'N/A' },
    { icon: '🚪', label: 'Doors', value: selectedCar.doors || 'N/A' },
    { icon: '❄️', label: 'Air Conditioner', value: selectedCar.airConditioner ? 'Yes' : 'No' },
    { icon: '👥', label: 'Seats', value: selectedCar.seats || 'N/A' },
    { icon: '📏', label: 'Distance', value: selectedCar.distance || 'N/A' }
  ];

  // Get car unique identifier (try _id, id, or use brand+index as fallback)
  const getCarId = (car) => {
    return car._id || car.id || `${car.brand}-${cars.indexOf(car)}`;
  };

  const selectedCarId = getCarId(selectedCar);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Car Detail */}
        <div className="bg-white rounded-3xl p-8 mb-12 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Images */}
            <div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{selectedCar.brand}</h1>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-purple-600">${selectedCar.pricePerDay}</span>
                  <span className="text-gray-500">/day</span>
                </div>
              </div>

              <div className="bg-gray-100 rounded-2xl p-12 mb-4 flex items-center justify-center">
                <img 
                  src={selectedCar.gallery?.[selectedImage] || selectedCar.imageUrl}
                  alt={selectedCar.brand}
                  className="w-full h-48 object-contain"
                />
              </div>

              {selectedCar.gallery && selectedCar.gallery.length > 0 && (
                <div className="flex gap-3">
                  {selectedCar.gallery.slice(0, 3).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-1 bg-gray-100 rounded-xl p-4 transition-all ${
                        selectedImage === idx ? 'ring-2 ring-purple-600' : ''
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-16 object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Specs */}
            <div>
              <h2 className="text-xl font-bold mb-6">Technical Specification</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {specs.map((spec, idx) => (
                  <div key={idx} className="text-center">
                    <div className="bg-gray-50 rounded-xl p-4 mb-2">
                      <div className="text-3xl mb-1">{spec.icon}</div>
                      <div className="text-xs text-gray-500 mb-1">{spec.label}</div>
                    </div>
                    <div className="text-sm font-semibold">{spec.value}</div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors mb-6">
                Rent a car
              </button>

              {selectedCar.equipment && selectedCar.equipment.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Car Equipment</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCar.equipment.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-purple-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Other Cars */}
        {cars.length > 1 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Other cars</h2>
              <button className="flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                View All <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.filter(car => getCarId(car) !== selectedCarId).slice(0, 7).map((car) => {
                const carId = getCarId(car);
                return (
                  <div 
                    key={carId}
                    onClick={() => {
                      setSelectedCar(car);
                      setSelectedImage(0);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="bg-gray-100 rounded-xl p-6 mb-4 flex items-center justify-center">
                      <img 
                        src={car.imageUrl}
                        alt={car.brand}
                        className="w-full h-24 object-contain"
                      />
                    </div>

                    <h3 className="font-bold text-lg mb-1">{car.brand}</h3>
                    <p className="text-sm text-gray-500 mb-3">{car.category}</p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-purple-600">${car.pricePerDay}</span>
                      <span className="text-xs text-gray-500">per day</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-4">
                          <img src={gearboxIcon} alt="gearbox" className="w-full h-full" />
                        </span>
                        <span>{car.gearBox}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-4">
                          <img src={gasIcon} alt="fuel" className="w-full h-full" />
                        </span>
                        <span>{car.fuel}</span>
                      </div>
                      {car.airConditioner && (
                        <div className="flex items-center gap-1">
                          <span className="w-4 h-4">
                            <img src={airIcon} alt="ac" className="w-full h-full" />
                          </span>
                          <span>AC</span>
                        </div>
                      )}
                    </div>

                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;