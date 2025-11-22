import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Users, MousePointer, DollarSign, Package, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://zb-qhvz.onrender.com/api/income/2025')
      .then(res => res.json())
      .then(data => {
        let formattedData = [];
        if (data && data.incomesByMonth) {
          formattedData = Object.keys(data.incomesByMonth).map(month => {
            const incomeData = data.incomesByMonth[month];
            const totalIncome = Array.isArray(incomeData) && incomeData.length > 0 
              ? (incomeData[0].totalIncome || 0)
              : 0;
            return { month, totalIncome };
          });
        }
        setIncomes(formattedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const totalIncome = incomes.reduce((sum, item) => sum + (item.totalIncome || 0), 0);
  const avgIncome = incomes.length ? Math.round(totalIncome / incomes.length) : 0;
  const maxIncome = Math.max(...incomes.map(i => i.totalIncome || 0));
  const months = incomes.length;

  const stats = [
    { icon: DollarSign, label: 'Total Income', value: `${(totalIncome / 1000000).toFixed(1)}M`, color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Avg Income', value: `${(avgIncome / 1000000).toFixed(1)}M`, color: 'text-green-600' },
    { icon: MousePointer, label: 'Peak Month', value: `${(maxIncome / 1000000).toFixed(1)}M`, color: 'text-red-600' },
    { icon: Package, label: 'Months', value: months.toString(), color: 'text-blue-600' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error)   return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOP SECTION */}
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* LEFT SIDE - SUMMARY */}
            <div className="lg:w-1/3 space-y-3 sm:space-y-4">
              <h2 className="text-xs sm:text-sm text-gray-600 font-medium">Monthly Income Overview</h2>

              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-600">
                {(totalIncome / 1000000).toFixed(0)}M
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <DollarSign className="w-4 h-4" />
                <span>Total yearly income</span>
              </div>

              <svg className="w-full h-14 sm:h-16" viewBox="0 0 200 60">
                <path
                  d="M 0 40 Q 25 35, 50 30 T 100 20 T 150 25 T 200 15"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="2"
                />
              </svg>

              <p className="text-[10px] sm:text-xs text-gray-500">
                Income growing steadily month by month
              </p>
            </div>

            {/* RIGHT SIDE - BAR CHART */}
            <div className="lg:w-2/3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-3 sm:p-4 md:p-6">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={incomes}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
                    formatter={(v) => `${(v / 1000000).toFixed(1)}M so'm`}
                  />
                  <Bar dataKey="totalIncome" fill="rgba(255,255,255,0.5)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* STAT CARDS - MOBILE FRIENDLY */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
            {stats.map((s, i) => (
              <div key={i} className="p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <s.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${s.color}`} />
                  <span className="text-xs sm:text-sm text-gray-600">{s.label}</span>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{s.value}</div>
                <div className="h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION - LINE CHART */}
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Monthly Income Trend</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <span className="text-xs sm:text-sm text-gray-600">Income (M so'm)</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={incomes}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

              <XAxis 
                dataKey="month"
                stroke="#9ca3af"
                tick={{ fill: '#6b7280', fontSize: 10 }}
                angle={-40}
                height={50}
              />

              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
              />

              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                formatter={(v) => [`${(v / 1000000).toFixed(1)}M so'm`, 'Income']}
              />

              <Area 
                type="monotone" 
                dataKey="totalIncome" 
                stroke="#9333ea" 
                strokeWidth={3}
                fill="url(#colorIncome)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
