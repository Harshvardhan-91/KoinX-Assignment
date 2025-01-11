import React from 'react';
import PropTypes from 'prop-types';

const CoinCarousel = ({ coins, title }) => {
  if (!coins || coins.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
        {coins.map((coin) => (
          <div 
            key={coin.item.id} 
            className="min-w-[252px] p-4 border border-gray-200 rounded-lg flex-shrink-0"
          >
            <div className="flex items-center gap-2 mb-3">
              <img 
                src={coin.item.small} 
                alt={coin.item.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium">{coin.item.symbol.toUpperCase()}</span>
              <div className={`ml-2 flex items-center px-2 py-0.5 rounded ${
                coin.item.data.price_change_percentage_24h?.usd > 0 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                <span className="text-sm">
                  {coin.item.data.price_change_percentage_24h?.usd > 0 ? '▲' : '▼'} 
                  {Math.abs(coin.item.data.price_change_percentage_24h?.usd || 0).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="font-medium text-lg">
              {coin.item.data.price}
            </div>
            <img 
              src={coin.item.data.sparkline}
              alt={`${coin.item.name} price graph`}
              className="w-full h-16 mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

CoinCarousel.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      symbol: PropTypes.string,
      small: PropTypes.string,
      data: PropTypes.shape({
        price: PropTypes.string,
        sparkline: PropTypes.string,
        price_change_percentage_24h: PropTypes.shape({
          usd: PropTypes.number
        })
      })
    })
  })),
  title: PropTypes.string.isRequired
};

export default CoinCarousel;