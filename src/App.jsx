import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PriceSection from './components/PriceSection';
import TradingViewChart from './components/TradingViewChart';
import TrendingCoins from './components/TrendingCoins';
import CoinCarousel from './components/CoinCarousel';
import { fetchBitcoinPrice, fetchTrendingCoins } from './api/coingecko';

function App() {
  const [priceData, setPriceData] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [price, trending] = await Promise.all([
        fetchBitcoinPrice(),
        fetchTrendingCoins()
      ]);
      setPriceData(price);
      setTrendingCoins(trending);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PriceSection priceData={priceData} />
              <TradingViewChart />
              <CoinCarousel 
                coins={trendingCoins} 
                title="You May Also Like" 
              />
              <CoinCarousel 
                coins={trendingCoins} 
                title="Trending Coins" 
              />
            </div>
            <div>
              <TrendingCoins coins={trendingCoins} />
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;