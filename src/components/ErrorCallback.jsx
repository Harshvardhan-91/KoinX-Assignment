// src/components/ErrorFallback.jsx
import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-[#EFF2F5] flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          {error?.message || 'Failed to fetch data. Please try again.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;

// src/pages/CoinPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
// ... other imports

const CoinPage = () => {
  const { coinId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [priceData, trendingData] = await Promise.all([
        fetchCoinData(coinId),
        fetchTrendingCoins()
      ]);
      setData({ price: priceData, trending: trendingData });
    } catch (error) {
      throw error; // Let ErrorBoundary handle it
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coinId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#EFF2F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={fetchData}
    >
      {/* Your existing component content */}
    </ErrorBoundary>
  );
};

export default CoinPage;