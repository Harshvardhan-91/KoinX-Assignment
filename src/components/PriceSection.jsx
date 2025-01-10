import React from 'react';

const PriceSection = ({ priceData }) => {
  const { usd = 0, usd_24h_change = 0, inr = 0 } = priceData?.bitcoin || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Bitcoin (BTC)</h1>
        <span className="text-gray-600">Rank #1</span>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">${usd?.toLocaleString()}</span>
          <span className={`text-sm ${usd_24h_change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {usd_24h_change?.toFixed(2)}%
          </span>
        </div>
        <div className="text-gray-600">
          ₹{inr?.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
