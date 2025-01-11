import React from 'react';
import { Info, ChevronRight, Newspaper, TrendingUp } from 'lucide-react';

const SentimentSection = () => {
  // Mock data for analyst estimates
  const estimates = {
    buy: 76,
    hold: 8,
    sell: 16,
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold">Sentiment</h2>
      </div>

      {/* Key Events Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Key Events</h3>
          <Info className="w-4 h-4 text-gray-400" />
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {/* Event Card 1 */}
            <div className="min-w-[320px] bg-blue-50 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="bg-blue-500 rounded-full p-2 h-fit">
                  <Newspaper className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium mb-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</p>
                  <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.</p>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="min-w-[320px] bg-green-50 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="bg-green-500 rounded-full p-2 h-fit">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium mb-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</p>
                  <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra in a adipisinc metus quis del</p>
                </div>
              </div>
            </div>
          </div>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Analyst Estimates */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Analyst Estimates</h3>
          <Info className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
            <span className="text-3xl font-bold text-green-500">{estimates.buy}%</span>
          </div>

          <div className="flex-1 space-y-2">
            {/* Buy */}
            <div className="flex items-center gap-4">
              <span className="w-8 text-sm">Buy</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${estimates.buy}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm">{estimates.buy}%</span>
            </div>

            {/* Hold */}
            <div className="flex items-center gap-4">
              <span className="w-8 text-sm">Hold</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-gray-400 rounded-full"
                  style={{ width: `${estimates.hold}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm">{estimates.hold}%</span>
            </div>

            {/* Sell */}
            <div className="flex items-center gap-4">
              <span className="w-8 text-sm">Sell</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${estimates.sell}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm">{estimates.sell}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentSection;