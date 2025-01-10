// src/components/Layout.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import PriceSection from './PriceSection';
import TradingViewChart from './TradingViewChart';
import TrendingCoins from './TrendingCoins';
import CoinCarousel from './CoinCarousel';

const Layout = () => {
  const { coinId = 'bitcoin' } = useParams();
  
  return (
    <div className="min-h-screen bg-[#EFF2F5]">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - 70% width on desktop */}
          <div className="lg:w-[70%] space-y-6">
            <PriceSection coinId={coinId} />
            <TradingViewChart coinId={coinId} />
            {/* Add other left column components */}
          </div>
          
          {/* Right Column - 30% width on desktop */}
          <div className="lg:w-[30%] space-y-6">
            <div className="bg-[#0052FE] text-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Get Started with KoinX</h2>
              {/* Add content */}
            </div>
            <TrendingCoins />
          </div>
        </div>
        
        {/* Carousels Section */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold">You May Also Like</h2>
          <CoinCarousel />
          <h2 className="text-2xl font-bold">Trending Coins</h2>
          <CoinCarousel />
        </div>
      </main>
    </div>
  );
};

export default Layout;