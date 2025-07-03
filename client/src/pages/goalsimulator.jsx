import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GoalSimulator = () => {
  const [goal, setGoal] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [years, setYears] = useState('');
  const [interest, setInterest] = useState('');
  const [data, setData] = useState([]);

  const calculateGrowth = () => {
    const monthlyRate = (parseFloat(interest) / 100) / 12;
    const totalMonths = parseInt(years) * 12;
    let futureValue = 0;
    const chartData = [];

    for (let i = 1; i <= totalMonths; i++) {
      futureValue = (futureValue + parseFloat(monthlyInvestment)) * (1 + monthlyRate);
      if (i % 12 === 0) {
        chartData.push({ year: `Year ${i / 12}`, value: futureValue.toFixed(0) });
      }
    }

    setData(chartData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">🎯 Wealth Goal Simulator</h2>
      <div className="grid grid-cols-1 gap-4">
        <input className="p-2 border rounded" type="text" placeholder="Goal Name (e.g. Buy a Car)" value={goal} onChange={e => setGoal(e.target.value)} />
        <input className="p-2 border rounded" type="number" placeholder="Monthly Investment (₹)" value={monthlyInvestment} onChange={e => setMonthlyInvestment(e.target.value)} />
        <input className="p-2 border rounded" type="number" placeholder="Years" value={years} onChange={e => setYears(e.target.value)} />
        <input className="p-2 border rounded" type="number" placeholder="Expected Annual Return (%)" value={interest} onChange={e => setInterest(e.target.value)} />
        <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700" onClick={calculateGrowth}>Simulate</button>
      </div>

      {data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-center">{goal} Projection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GoalSimulator;
