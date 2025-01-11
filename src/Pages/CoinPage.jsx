import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TradingViewChart from '../components/TradingViewChart';
import PriceSection from '../components/PriceSection';
import TrendingCoins from '../components/TrendingCoins';
import CoinCarousel from '../components/CoinCarousel';
import { fetchCoinData, fetchTrendingCoins, fetchCoinDetails } from '../api/coingecko';
import TokenomicsSection from '../components/Tokemonics';
import About from '../components/About';
import SentimentSection from '../components/Sentiment';
import PerformanceSection from '../components/Performance';
import Frame from '../assets/Frame.png'

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
            <PerformanceSection/>

            {/* Sentiment Section */}
            <SentimentSection/>

            {/* About Section */}
            <About/>

            {/* Tokenomics Section */}
            <TokenomicsSection />

            {/* TEAM SECTION */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Team</h2>
              <p className="text-[#3E424A] mb-6">Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium quam. Facilisis purus convallis quam augue.</p>
              
              <div className="space-y-6">
                {/* Team member cards */}
                <div className="bg-[#E8F4FD] rounded-lg p-4">
                  <div className="flex gap-6">
                    <div className="w-24 h-24">
                      <img src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png" alt="John Smith" className="w-full h-full object-cover rounded"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">John Smith</h3>
                      <p className="text-sm text-[#788F9B] mb-2">Designation here</p>
                      <p className="text-sm text-[#0F1629]">Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</p>
                    </div>
                  </div>
                </div>
                {/* Add more team members */}
                <div className="bg-[#E8F4FD] rounded-lg p-4">
                  <div className="flex gap-6">
                    <div className="w-24 h-24">
                      <img src="https://billey-4437.kxcdn.com/wp-content/uploads/2019/08/team-member-01.jpg" alt="John Smith" className="w-full h-full object-cover rounded"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Elina Williams</h3>
                      <p className="text-sm text-[#788F9B] mb-2">Designation here</p>
                      <p className="text-sm text-[#0F1629]">Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#E8F4FD] rounded-lg p-4">
                  <div className="flex gap-6">
                    <div className="w-24 h-24">
                      <img src="https://flashserviceagency.com/wp-content/uploads/2022/05/single-team.jpg" alt="John Smith" className="w-full h-full object-cover rounded"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">John Smith</h3>
                      <p className="text-sm text-[#788F9B] mb-2">Designation here</p>
                      <p className="text-sm text-[#0F1629]">Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</p>
                    </div>
                  </div>
                </div>
              </div>
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
                src={Frame} 
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