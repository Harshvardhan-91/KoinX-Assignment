import React from 'react';
import PropTypes from 'prop-types';

const TrendingCoins = ({ coins }) => {
  if (!coins || coins.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Trending Coins (24h)</h2>
      <div className="space-y-4">
        {coins.slice(0, 3).map((coin) => (
          <div key={coin.item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={coin.item.small} 
                alt={coin.item.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium">{coin.item.name}</span>
            </div>
            <div className={`flex items-center px-2 py-1 rounded ${
              coin.item.data.price_change_percentage_24h?.usd > 0 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              <span className="text-sm font-medium">
                {coin.item.data.price_change_percentage_24h?.usd > 0 ? '▲' : '▼'} 
                {Math.abs(coin.item.data.price_change_percentage_24h?.usd || 0).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TrendingCoins.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      small: PropTypes.string,
      data: PropTypes.shape({
        price_change_percentage_24h: PropTypes.shape({
          usd: PropTypes.number
        })
      })
    })
  }))
};

export default TrendingCoins;