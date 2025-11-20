import React, { useState, useEffect } from 'react';
import { CheckCircle2, Droplet, DoorClosed, Users, Wind, Gauge, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`https://zb-qhvz.onrender.com/api/cars/${id}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        return fetch('https://zb-qhvz.onrender.com/api/cars');
      })
      .then(res => res.json())
      .then(data => {
        setAllCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [id]); // id o'zgarsa fetch qayta ishlaydi

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!car || car.message === "Car not found") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Car not found</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const selectedBrand = car.brand || localStorage.getItem('selectedBrand');
  const sameBrandCars = allCars.filter(c => c.brand === selectedBrand && c._id !== car._id);

  const handleCarClick = (carId, brand, category) => {
    localStorage.setItem('selectedBrand', brand);
    localStorage.setItem('selectedCategory', category);
    navigate(`/details/${carId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div key={id} className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Cars
        </button>

        {/* Car Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{car.name}</h1>
              <p className="text-gray-500">{car.category}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-3xl font-bold text-purple-600">${car.pricePerDay}</div>
              <div className="text-gray-500">/day</div>
            </div>
          </div>
        </div>

        {/* Car Gallery & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="rounded-xl p-8 flex items-center justify-center">
                <img 
                  src={car.gallery?.[selectedImage] || car.imageUrl} 
                  alt={car.name}
                  className="w-full h-64 object-contain"
                />
              </div>
            </div>

            {car.gallery && (
              <div className="grid grid-cols-3 gap-3">
                {car.gallery.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`bg-white rounded-xl p-3 transition-all ${selectedImage === idx ? 'ring-2 ring-purple-600 shadow-md' : 'hover:shadow-md'}`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-16 object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Technical Specs */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Technical Specification</h2>
              <div className="grid grid-cols-2 gap-6">
                <div><div className="flex items-center gap-2 text-gray-400 mb-2"><Gauge size={20}/>Gear Box</div><p className="font-semibold text-gray-900">{car.gearBox}</p></div>
                <div><div className="flex items-center gap-2 text-gray-400 mb-2"><Droplet size={20}/>Fuel</div><p className="font-semibold text-gray-900">{car.fuel}</p></div>
                <div><div className="flex items-center gap-2 text-gray-400 mb-2"><DoorClosed size={20}/>Doors</div><p className="font-semibold text-gray-900">{car.doors}</p></div>
                <div><div className="flex items-center gap-2 text-gray-400 mb-2"><Wind size={20}/>Air Conditioner</div><p className="font-semibold text-gray-900">{car.airConditioner ? 'Yes':'No'}</p></div>
                <div><div className="flex items-center gap-2 text-gray-400 mb-2"><Users size={20}/>Seats</div><p className="font-semibold text-gray-900">{car.seats}</p></div>
                <div><div className="flex items-center gap-2 text-gray-400 mb-2"><Gauge size={20}/>Distance</div><p className="font-semibold text-gray-900">{car.distance}</p></div>
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Car Equipment</h2>
              <div className="grid grid-cols-2 gap-4">
                {car.equipment?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={16} className="text-purple-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-purple-200">
              Rent a car
            </button>
          </div>
        </div>

        {/* Other Cars - Same Brand */}
        {sameBrandCars.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Other {selectedBrand} Cars</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sameBrandCars.slice(0, 8).map(otherCar => (
                <div 
                  key={otherCar._id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                >
                  <div 
                    onClick={() => handleCarClick(otherCar._id, otherCar.brand, otherCar.category)}
                    className="bg-gray-100 rounded-xl p-6 mb-4 flex items-center justify-center"
                  >
                    <img src={otherCar.imageUrl} alt={otherCar.name} className="w-full h-24 object-contain"/>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{otherCar.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{otherCar.category}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-purple-600">${otherCar.pricePerDay}</span>
                    <span className="text-xs text-gray-500">per day</span>
                  </div>

                  <button
                    onClick={() => handleCarClick(otherCar._id, otherCar.brand, otherCar.category)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
