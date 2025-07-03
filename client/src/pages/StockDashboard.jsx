import React, { useEffect, useState } from 'react';
import axios from 'axios';

const symbols = ['AAPL', 'GOOGL', 'TSLA'];

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const res = await axios.get(`http://localhost:5000/api/quote/${symbol}`);
            return {
              symbol,
              price: res.data.c,
              change: ((res.data.c - res.data.pc) / res.data.pc * 100).toFixed(2)
            };
          } catch (error) {
            console.error(`Error fetching ${symbol}:`, error.message);
            return null;
          }
        })
      );
      setStocks(results.filter(Boolean));
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stocks.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">📉 No data available</p>
      ) : (
        stocks.map(stock => (
          <div key={stock.symbol} className="p-4 bg-white rounded-xl shadow hover:scale-105 transition-all duration-200">
            <h2 className="text-xl font-bold">{stock.symbol}</h2>
            <p className="text-gray-700 text-lg">₹{stock.price}</p>
            <p className={stock.change >= 0 ? 'text-green-600' : 'text-red-500'}>
              {stock.change >= 0 ? '▲' : '▼'} {stock.change}%
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default StockDashboard;
