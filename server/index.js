const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = 'd1j4ba1r01qhbuvtdn3gd1j4ba1r01qhbuvtdn40';

app.get('/api/quote/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock quote' });
  }
});

app.get('/api/candle/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const now = Math.floor(Date.now() / 1000);
  const weekAgo = now - 7 * 24 * 60 * 60;

  try {
    const response = await axios.get(`https://finnhub.io/api/v1/stock/candle`, {
      params: {
        symbol,
        resolution: 'D',
        from: weekAgo,
        to: now,
        token: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching candle data:', error.message);
    res.status(500).json({ error: 'Failed to fetch candle data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
