import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Users, MousePointer, DollarSign, Package, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://zb-qhvz.onrender.com/api/income')
      .then(res => res.json())
      .then(data => {
        const formattedData = Array.isArray(data) ? data : [data];
        setIncomes(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching income data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Calculate stats from income data
  const totalIncome = incomes.reduce((sum, item) => sum + (item.totalIncome || 0), 0);
  const avgIncome = incomes.length > 0 ? Math.round(totalIncome / incomes.length) : 0;
  const maxIncome = Math.max(...incomes.map(item => item.totalIncome || 0));
  const months = incomes.length;

  const stats = [
    { icon: DollarSign, label: 'Total Income', value: `${(totalIncome / 1000000).toFixed(1)}M`, color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Avg Income', value: `${(avgIncome / 1000000).toFixed(1)}M`, color: 'text-green-600' },
    { icon: MousePointer, label: 'Peak Month', value: `${(maxIncome / 1000000).toFixed(1)}M`, color: 'text-red-600' },
    { icon: Package, label: 'Months', value: months.toString(), color: 'text-blue-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Section - Income Bar Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Summary */}
            <div className="lg:w-1/3 space-y-4">
              <h2 className="text-sm text-gray-600 font-medium">Monthly Income Overview</h2>
              <div className="text-6xl font-bold text-purple-600">
                {(totalIncome / 1000000).toFixed(0)}M
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <DollarSign className="w-4 h-4" />
                <span>Total yearly income</span>
              </div>
              {/* Mini trend line */}
              <svg className="w-full h-16" viewBox="0 0 200 60">
                <path
                  d="M 0 40 Q 25 35, 50 30 T 100 20 T 150 25 T 200 15"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="2"
                />
              </svg>
              <p className="text-xs text-gray-500">Income growing steadily month by month</p>
            </div>

            {/* Right Side - Bar Chart */}
            <div className="lg:w-2/3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={incomes}>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => `${(value / 1000000).toFixed(1)}M so'm`}
                  />
                  <Bar 
                    dataKey="totalIncome" 
                    fill="rgba(255, 255, 255, 0.4)" 
                    radius={[8, 8, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Income Line Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Monthly Income Trend</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <span className="text-sm text-gray-600">Income (Million so'm)</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
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
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`${(value / 1000000).toFixed(1)}M so'm`, 'Income']}
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