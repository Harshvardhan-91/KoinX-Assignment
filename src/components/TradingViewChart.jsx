// src/components/TradingViewChart.jsx
import React, { useEffect } from 'react';

const TradingViewChart = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: 'tradingview-widget',
          symbol: 'BTCUSD',
          interval: 'D',
          timezone: 'exchange',
          theme: 'light',
          style: '1',
          toolbar_bg: '#f1f3f6',
          height: 400,
          withdateranges: true,
        });
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="tradingview-widget" className="w-full h-[400px]" />
  );
};

export default TradingViewChart;