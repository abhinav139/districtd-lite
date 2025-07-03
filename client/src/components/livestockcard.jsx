// src/components/LiveStockCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LiveStockCard({ symbol = 'AAPL' }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d1j3n89r01qhbuvta7bgd1j3n89r01qhbuvta7c0`
        );
        setPrice(res.data.c); // current price
      } catch (err) {
        console.error('Error fetching stock:', err);
      }
    };

    fetchStock();
    const interval = setInterval(fetchStock, 10000); // refresh every 10 sec

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 text-center">
      <h2 className="text-xl font-semibold mb-2">{symbol}</h2>
      <p className="text-3xl text-green-600 font-bold">
        ${price ? price.toFixed(2) : 'Loading...'}
      </p>
    </div>
  );
}

export default LiveStockCard;
