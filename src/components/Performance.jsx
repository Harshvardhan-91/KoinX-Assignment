import React from 'react';
import { Info } from 'lucide-react';

const PriceRangeIndicator = ({ low, high, current }) => {
  const range = high - low;
  const position = ((current - low) / range) * 100;
  
  return (
    <div className="relative mt-2">
      <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
      <div 
        className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${position}%` }}
      >
        <div className="rotate-45 bg-gray-800 p-1">
          <div className="w-1 h-1" />
        </div>
      </div>
    </div>
  );
};

const PerformanceSection = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Performance</h2>

      {/* Price Ranges */}
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Today's Low</span>
            <span>Today's High</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>46,930.22</span>
            <span>49,343.83</span>
          </div>
          <PriceRangeIndicator 
            low={46930.22}
            high={49343.83}
            current={48637.83}
          />
          <div className="text-center mt-1">
            <span className="text-sm text-gray-600">${Number(48637.83).toLocaleString()}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>52W Low</span>
            <span>52W High</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>16,930.22</span>
            <span>49,743.83</span>
          </div>
          <PriceRangeIndicator 
            low={16930.22}
            high={49743.83}
            current={48637.83}
          />
        </div>
      </div>

      {/* Fundamentals */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Fundamentals</h3>
          <Info className="w-4 h-4 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Bitcoin Price</span>
              <span className="font-medium">${Number(16815.46).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">24h Low / 24h High</span>
              <span className="font-medium">${Number(16382.07).toLocaleString()} / ${Number(16874.12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">7d Low / 7d High</span>
              <span className="font-medium">${Number(16382.07).toLocaleString()} / ${Number(16874.12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Trading Volume</span>
              <span className="font-medium">${Number(23249202782).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Market Cap Rank</span>
              <span className="font-medium">#1</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Market Cap</span>
              <span className="font-medium">${Number(323507290047).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Market Cap Dominance</span>
              <span className="font-medium">38.343%</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Volume / Market Cap</span>
              <span className="font-medium">0.0718</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">All-Time High</span>
              <div className="text-right">
                <div className="font-medium">${Number(69044.77).toLocaleString()}</div>
                <div className="text-red-500 text-sm">-75.6%</div>
                <div className="text-gray-500 text-sm">Nov 10, 2021 (about 1 year)</div>
              </div>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">All-Time Low</span>
              <div className="text-right">
                <div className="font-medium">${Number(67.81).toLocaleString()}</div>
                <div className="text-green-500 text-sm">24729.1%</div>
                <div className="text-gray-500 text-sm">Jul 06, 2013 (over 9 years)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;