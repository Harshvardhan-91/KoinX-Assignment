import React from 'react';

const CoinCarousel = ({ coins, title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {coins.map((coin) => (
          <div 
            key={coin.item.id} 
            className="min-w-[200px] p-4 border rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={coin.item.small} 
                alt={coin.item.name}
                className="w-6 h-6"
              />
              <span>{coin.item.symbol.toUpperCase()}</span>
            </div>
            <div className="text-lg font-bold">
              ${coin.item.data.price}
            </div>
            <img 
              src={coin.item.data.sparkline} 
              alt="Price graph" 
              className="w-full h-16 mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinCarousel;