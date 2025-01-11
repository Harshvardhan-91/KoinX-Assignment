import React from 'react';

const TokenomicsSection = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Tokenomics</h2>
      <h3 className="font-bold mb-4">Initial Distribution</h3>
      <div className="flex items-center gap-8">
        <div className="w-48 h-48 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#2196F3"
              strokeWidth="20"
              strokeDasharray={`${80 * 251.2 / 100} 251.2`}
              className="stroke-[20]"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#FF9800"
              strokeWidth="20"
              strokeDasharray={`${20 * 251.2 / 100} 251.2`}
              strokeDashoffset={`${-80 * 251.2 / 100}`}
              className="stroke-[20]"
            />
          </svg>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Crowdsale investors: 80%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Foundation: 20%</span>
          </div>
        </div>
      </div>
      <p className="mt-6 text-gray-600">
        Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.
      </p>
    </div>
  );
};

export default TokenomicsSection;