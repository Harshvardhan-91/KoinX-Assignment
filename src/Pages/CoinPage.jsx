import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TradingViewChart from '../components/TradingViewChart';
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
    <div className="min-h-screen bg-[#EFF2F5] pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm py-4">
          <Link to="/" className="text-gray-600">Cryptocurrencies</Link>
          <span className="text-gray-600">&gt;</span>
          <span className="text-black">{coinData?.details?.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-[70%] space-y-5">
            <PriceSection coinData={coinData} />
            
            {/* Tabs Section */}
            <div className="bg-white rounded-lg p-6">
              <div className="border-b flex gap-8 text-base">
                <button className="border-b-2 border-[#0052FE] text-[#0052FE] pb-4 font-semibold">
                  Overview
                </button>
                <button className="text-gray-500 pb-4">
                  Fundamentals
                </button>
                {/* Add other tabs here */}
              </div>
              <div className="py-6">
                <TradingViewChart symbol={coinData?.details?.symbol} />
              </div>
            </div>

            {/* Performance Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Performance</h2>
              {/* Add performance metrics here */}
            </div>

            {/* Sentiment Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Sentiment</h2>
              {/* Add sentiment metrics here */}
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">About {coinData?.details?.name}</h2>
              {/* Add about content here */}
            </div>

            {/* Tokenomics Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Tokenomics</h2>
              {/* Add tokenomics content here */}
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Team</h2>
              {/* Add team members here */}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[30%] space-y-5">
            {/* Get Started Card */}
            <div className="bg-[#0052FE] text-white p-6 rounded-2xl text-center">
              <h2 className="text-2xl font-bold mb-4">Get Started with KoinX</h2>
              <p className="mb-6 text-sm">
                With our range of features that you can equip for free,
                KoinX allows you to be more educated and aware of your tax reports.
              </p>
              <img 
                src="../assets/Frame.png" 
                alt="KoinX Features" 
                className="mx-auto mb-6 w-32 h-32"
              />
              <button className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                Get Started for FREE →
              </button>
            </div>

            <TrendingCoins coins={trendingCoins} />
          </div>
        </div>

        {/* Bottom Carousel Sections */}
        <div className="mt-8 space-y-8">
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
    </div>
  );
};

export default CoinPage;