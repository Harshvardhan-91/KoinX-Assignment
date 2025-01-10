import React, { useEffect, useState } from 'react';
import TradingViewChart from '../components/TradingViewChart';
import { useParams, useNavigate } from 'react-router-dom';
import PriceSection from '../components/PriceSection';
import TrendingCoins from '../components/TrendingCoins';
import CoinCarousel from '../components/CoinCarousel';
import { fetchCoinData, fetchTrendingCoins, fetchCoinDetails } from '../api/coingecko';

const CoinPage = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coinData, setCoinData] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [price, trending, details] = await Promise.all([
          fetchCoinData(coinId),
          fetchTrendingCoins(),
          fetchCoinDetails(coinId)
        ]);

        // Validate if coin exists
        if (!price[coinId]) {
          throw new Error('Coin not found');
        }

        setCoinData({ price, details });
        setTrendingCoins(trending);
      } catch (err) {
        setError(err.message);
        if (err.message === 'Coin not found') {
          navigate('/not-found', { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up polling for price updates
    const priceInterval = setInterval(async () => {
      try {
        const newPrice = await fetchCoinData(coinId);
        setCoinData(prev => ({ ...prev, price: newPrice }));
      } catch (err) {
        console.error('Error updating price:', err);
      }
    }, 30000);

    return () => clearInterval(priceInterval);
  }, [coinId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error: {error}</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-[70%] space-y-8">
          <PriceSection coinData={coinData} />
          <TradingViewChart symbol={coinData?.details?.symbol} />
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
              <CoinCarousel coins={trendingCoins} />
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4">Trending Coins</h2>
              <CoinCarousel coins={trendingCoins} />
            </section>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-[30%] space-y-8">
          <div className="bg-[#0052FE] text-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Get Started with KoinX</h2>
            <p className="mb-4">Track your portfolio and taxes with KoinX</p>
            <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Get Started for FREE →
            </button>
          </div>
          <TrendingCoins coins={trendingCoins} />
        </div>
      </div>
    </main>
  );
};

export default CoinPage;