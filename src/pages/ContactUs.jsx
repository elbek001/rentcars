import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Car
} from 'lucide-react';
import img from '../assets/ferari.jpg';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import Footer from '../components/Footer';

export default function CarRentalContact() {
  const [formData, setFormData] = useState({
    carType: '',
    placeOfRental: '',
    placeOfReturn: '',
    rentalDate: '',
    returnDate: '',
    phoneNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  const uzbekRegions = [
    'Toshkent',
    'Samarqand',
    'Buxoro',
    "Farg'ona",
    'Andijon',
    'Namangan',
    'Qashqadaryo',
    'Surxondaryo',
    'Jizzax',
    'Sirdaryo',
    'Xorazm',
    'Navoiy'
  ];

  // Fetch car types
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://zb-qhvz.onrender.com/api/cars');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        }
      } catch (error) {
        console.error('Mashinalarni yuklashda xatolik:', error);
      } finally {
        setLoadingCars(false);
      }
    };
    fetchCars();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const { carType, placeOfRental, placeOfReturn, rentalDate, returnDate, phoneNumber } =
      formData;

    if (!carType || !placeOfRental || !placeOfReturn || !rentalDate || !returnDate) {
      setMessage({ type: 'error', text: 'Iltimos, barcha maydonlarni to‘ldiring!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('https://zb-qhvz.onrender.com/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Buyurtma muvaffaqiyatli yuborildi! Tez orada siz bilan bog‘lanamiz.'
        });
        setFormData({
          carType: '',
          placeOfRental: '',
          placeOfReturn: '',
          rentalDate: '',
          returnDate: '',
          phoneNumber: ''
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Xatolik yuz berdi' });
      }
    } catch (error) {
      console.error('Xatolik:', error);
      setMessage({
        type: 'error',
        text: 'Buyurtma yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.'
      });
    } finally {
      setLoading(false);
    }
  };

  const blogPosts = [
    { title: 'How To Choose The Right Car', category: 'News', date: '12 April 2024' },
    { title: 'Which plan is right for me?', category: 'News', date: '12 April 2024' },
    { title: 'Enjoy Speed, Choice & Total Control', category: 'News', date: '12 April 2024' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-900">Contact Us</h1>
          <p className="text-center text-gray-500 mt-2">Home / Contact Us</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-[#5937E0] rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Book your car</h2>

              {message.text && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                  } text-white text-sm`}
                >
                  {message.text}
                </div>
              )}

              <div className="space-y-4">
                {/* Car Type */}
                <select
                  value={formData.carType}
                  onChange={(e) => handleChange('carType', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#694BE3] text-white border-none focus:ring-2 focus:ring-white outline-none"
                  disabled={loadingCars}
                >
                  <option value="">
                    {loadingCars ? 'Yuklanmoqda...' : 'Car type'}
                  </option>
                  {cars.map((car) => (
                    <option key={car._id || car.id} value={car.name || car.model || car.type}>
                      {car.name || car.model || car.type}
                    </option>
                  ))}
                </select>

                {/* Rental Places */}
                <select
                  value={formData.placeOfRental}
                  onChange={(e) => handleChange('placeOfRental', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#694BE3] text-white border-none focus:ring-2 focus:ring-white outline-none"
                >
                  <option value="">Place of rental</option>
                  {uzbekRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>

                <select
                  value={formData.placeOfReturn}
                  onChange={(e) => handleChange('placeOfReturn', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#694BE3] text-white border-none focus:ring-2 focus:ring-white outline-none"
                >
                  <option value="">Place of return</option>
                  {uzbekRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>

                {/* Dates */}
                <input
                  type="date"
                  value={formData.rentalDate}
                  onChange={(e) => handleChange('rentalDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#694BE3] text-white border-none focus:ring-2 focus:ring-white outline-none"
                />

                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleChange('returnDate', e.target.value)} // ✅ fixed bug here
                  className="w-full px-4 py-3 rounded-lg bg-[#694BE3] text-white border-none focus:ring-2 focus:ring-white outline-none"
                />

                {/* Phone */}
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="Your phone number"
                  className="w-full px-4 py-3 rounded-lg text-white bg-[#694BE3] placeholder-purple-200 border-none focus:ring-2 focus:ring-white outline-none"
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full bg-[#FF9E0C] text-white font-semibold py-3 rounded-lg hover:bg-orange-500 transition-all duration-200 shadow-lg ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Yuborilmoqda...' : 'Book now'}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Image / Map */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-[550px] flex items-center justify-center shadow-lg overflow-hidden">
              <img className="object-cover w-full h-full" src={img} alt="Car rental map" />
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <InfoCard icon={<MapPin />} title="Address" text="Oxford Ave. Cary, NC 27511" />
          <InfoCard icon={<Mail />} title="Email" text="nwiger@yahoo.com" />
          <InfoCard icon={<Phone />} title="Phone" text="+537 547-6401" />
          <InfoCard icon={<Clock />} title="Opening hours" text="Sun-Mon: 10am - 10pm" />
        </div>

        {/* Blog Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Latest blog posts & news
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-48 flex items-center justify-center">
                  <img src={img} alt={post.title} className="object-cover h-full w-full" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {post.category} / {post.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// Info Card Component
function InfoCard({ icon, title, text }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="bg-orange-500 p-3 rounded-full text-white">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}
