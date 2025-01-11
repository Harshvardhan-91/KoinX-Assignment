import React from 'react';

const BitcoinAboutSection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">About Bitcoin</h2>
        
        {/* Price Statistics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">What is Bitcoin?</h3>
          <div className="space-y-3 text-gray-600">
            <p>
              Bitcoin's price today is US$16,951.82, with a 24-hour trading volume of $19.14 B. 
              BTC is +0.35% in the last 24 hours. It is currently -7.70% from its 7-day all-time 
              high of $18,366.66, and 3.40% from its 7-day all-time low of $16,394.75. BTC has a 
              circulating supply of 19.24 M BTC and a max supply of 21 M BTC.
            </p>
            
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur. Aliquam placerat at lobortis tristique quam. 
              Duis ut et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi 
              diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.
            </p>
            
            <p className="mt-4">
              Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque 
              auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Calculate your Profits</h3>
            <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center">
              Check Now
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Calculate your tax liability</h3>
            <button className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium flex items-center">
              Check Now
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-8 text-gray-600">
          Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. 
          Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti facilisi 
          lacinia congue ipsum amet dui.
        </p>
      </div>
    </div>
  );
};

export default BitcoinAboutSection;