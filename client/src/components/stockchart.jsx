import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'TSLA']; // Add more if you like

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'd1j3n89r01qhbuvta7bgd1j3n89r01qhbuvta7c0';

  useEffect(() => {
    const fetchStocks = async () => {
      const promises = SYMBOLS.map(symbol =>
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
          .then(res => ({
            symbol,
            name: symbol,
            price: res.data.c,
            change: ((res.data.c - res.data.pc) / res.data.pc * 100).toFixed(2),
          }))
      );

      const results = await Promise.all(promises);
      setStocks(results);
      setLoading(false);
    };

    fetchStocks();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (stocks.length === 0) return <p className="text-center text-red-500">❌ No data available</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stocks.map(stock => (
        <div key={stock.symbol} className="p-4 bg-white rounded-xl shadow hover:scale-105 transition-all duration-200">
          <h2 className="text-xl font-bold">{stock.name} ({stock.symbol})</h2>
          <p className="text-gray-600">₹{stock.price}</p>
          <p className={stock.change >= 0 ? 'text-green-600' : 'text-red-500'}>
            {stock.change >= 0 ? '▲' : '▼'} {stock.change}%
          </p>
          <div className="h-32 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateData(stock.price)}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#4f46e5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

const generateData = (price) =>
  Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    price: price + Math.floor((Math.random() - 0.5) * 20),
  }));

export default StockDashboard;
