// src/components/TradingViewChart.jsx
import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

const TradingViewChart = ({ symbol = 'BTCUSD' }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    // Clean up any existing content
    container.current.innerHTML = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    container.current.appendChild(widgetContainer);

    // Determine the symbol to use
    const tradingSymbol = symbol 
      ? `BINANCE:${symbol.toUpperCase()}USDT`
      : 'BINANCE:BTCUSDT';

    try {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;

      // Configure the widget
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": tradingSymbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "save_image": false,
        "calendar": false,
        "hide_volume": false,
        "support_host": "https://www.tradingview.com"
      });

      container.current.appendChild(script);
    } catch (error) {
      console.error('Error initializing TradingView widget:', error);
      // Add a fallback message if widget fails to load
      container.current.innerHTML = `
        <div class="flex items-center justify-center h-[500px] bg-gray-50 rounded-lg">
          <div class="text-center">
            <p class="text-gray-600">Chart temporarily unavailable</p>
            <button 
              onclick="window.location.reload()" 
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Chart
            </button>
          </div>
        </div>
      `;
    }

    // Cleanup function
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol]); // Only re-run if symbol changes

  return (
    <div className="tradingview-widget-container">
      <div 
        ref={container} 
        className="relative bg-white rounded-lg shadow-sm"
        style={{ height: '560px' }}
      />
    </div>
  );
};

TradingViewChart.propTypes = {
  symbol: PropTypes.string
};

// Memoize the component to prevent unnecessary re-renders
export default memo(TradingViewChart);