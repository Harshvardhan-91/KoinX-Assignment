// src/api/coingecko.js
import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const fetchBitcoinPrice = async () => {
  try {
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'inr,usd',
        include_24hr_change: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return null;
  }
};

export const fetchTrendingCoins = async () => {
  try {
    const response = await axios.get(`${COINGECKO_API}/search/trending`);
    return response.data.coins;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return [];
  }
};