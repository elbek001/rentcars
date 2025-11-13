import React, { useState, useEffect } from 'react';

export default function RegionsPage () {
  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch('https://zb-qhvz.onrender.com/api/regions');
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error('Xatolik:', error);
      setMessage('Regionlarni yuklashda xatolik');
    }
  };

  const addRegion = async () => {
    if (!newRegion.trim()) {
      setMessage('Region nomini kiriting');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://zb-qhvz.onrender.com/api/regions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newRegion }),
      });

      if (response.ok) {
        const data = await response.json();
        setRegions([...regions, data]);
        setNewRegion('');
        setMessage('Region muvaffaqiyatli qo\'shildi!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Xatolik:', error);
      setMessage('Regionni qo\'shishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addRegion();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Region qo'shish formasi */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Yangi Region Qo'shish
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Region Nomi
              </label>
              <input
                type="text"
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Masalan: Samarqand"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={addRegion}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Qo\'shilmoqda...' : 'Region Qo\'shish'}
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
              message.includes('muvaffaqiyatli') 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Regionlar ro'yxati */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Barcha Regionlar
          </h2>
          
          {regions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Regionlar yuklanmoqda...</p>
          ) : (
            <div className="space-y-2">
              {regions.map((region) => (
                <div
                  key={region._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700 font-medium">{region.name}</span>
                  <span className="text-xs text-gray-400">ID: {region._id.slice(-6)}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 text-center text-sm text-gray-500">
            Jami: {regions.length} ta region
          </div>
        </div>
      </div>
    </div>
  );
}