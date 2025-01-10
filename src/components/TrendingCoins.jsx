import React from 'react';

const TrendingCoins = ({ coins }) => {
  if (!coins || coins.length === 0) {
    return <div>No trending coins available. Please check again later.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Trending Coins (24h)</h2>
      <div className="space-y-4">
        {coins.map((coin) => (
          <div key={coin.item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={coin.item.small} 
                alt={coin.item.name}
                className="w-6 h-6"
              />
              <span>{coin.item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;
