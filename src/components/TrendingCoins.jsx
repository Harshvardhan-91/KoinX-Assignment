import React from 'react';

const TrendingCoins = ({ coins }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Trending Coins (24h)</h2>
      <div className="space-y-4">
        {coins.slice(0, 3).map((coin) => (
          <div key={coin.item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={coin.item.small} 
                alt={coin.item.name}
                className="w-6 h-6"
              />
              <span>{coin.item.name}</span>
            </div>
            <span className={`text-sm ${coin.item.data.price_change_percentage_24h?.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {coin.item.data.price_change_percentage_24h?.usd?.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;