import React from 'react';
import PropTypes from 'prop-types';

const PriceSection = ({ coinData }) => {
  if (!coinData || !coinData.price) {
    return null;
  }

  const coinId = Object.keys(coinData.price)[0];
  const { usd = 0, usd_24h_change = 0, inr = 0 } = coinData.price[coinId] || {};
  const details = coinData.details || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {details.image?.thumb && (
            <img 
              src={details.image.thumb} 
              alt={details.name} 
              className="w-8 h-8"
            />
          )}
          <h1 className="text-2xl font-bold">{details.name || 'Bitcoin'} ({details.symbol?.toUpperCase() || 'BTC'})</h1>
        </div>
        <span className="text-gray-600">Rank #{details.market_cap_rank || 'N/A'}</span>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">
            ${typeof usd === 'number' ? usd.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}
          </span>
          <div className={`flex items-center px-2 py-1 rounded ${usd_24h_change > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <span className={`text-sm font-medium ${usd_24h_change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {usd_24h_change > 0 ? '↑' : '↓'} {Math.abs(usd_24h_change).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="text-gray-600 mt-1">
          ₹{typeof inr === 'number' ? inr.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : 'N/A'}
        </div>
      </div>
    </div>
  );
};

PriceSection.propTypes = {
  coinData: PropTypes.shape({
    price: PropTypes.object,
    details: PropTypes.object
  })
};

export default PriceSection;