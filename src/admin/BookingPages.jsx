import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Phone, Clock } from 'lucide-react';

const BookingPages = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://zb-qhvz.onrender.com/api/bookings');
      if (!response.ok) throw new Error('Ma\'lumotlarni yuklashda xatolik');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-xl text-gray-700">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-lg">
          <p className="font-bold text-xl">Xatolik yuz berdi</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen shadow-xl rounded-3xl ml-7 mt-7 py-12 bg-gray-50 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
             Bron qilingan mashinalar
          </h1>
          <p className="text-xl text-gray-600">
            Jami bronlar: <span className="font-semibold text-indigo-600">{bookings.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, index) => {
            const days = calculateDays(booking.rentalDate, booking.returnDate);
            
            return (
              <div 
                key={booking._id}
                className="bg-white rounded-xl shadow-ml overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-[linear-gradient(135deg,#4e54c8,#8f94fb)] p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Bron{index + 1}</h3>
                    <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
                      <span className="text-black font-semibold">{days} kun</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Olib ketish joyi</p>
                      <p className="text-lg font-semibold text-gray-900">{booking.placeOfRental}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Qaytarish joyi</p>
                      <p className="text-lg font-semibold text-gray-900">{booking.placeOfReturn}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Ijara sanasi</p>
                        <p className="text-base font-medium text-gray-900">{formatDate(booking.rentalDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Qaytarish sanasi</p>
                        <p className="text-base font-medium text-gray-900">{formatDate(booking.returnDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Telefon raqam</p>
                        <a 
                          href={`tel:${booking.phoneNumber}`}
                          className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                          {booking.phoneNumber}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 pt-2">
                    <Clock className="w-4 h-4" />
                    <span>Yaratilgan: {formatDate(booking.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600">Hozircha hech qanday bron yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPages;