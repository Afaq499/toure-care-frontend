import React, { useState } from 'react';

const FundInfo: React.FC = () => {
  const [network, setNetwork] = useState<'TRC20' | 'ERC20' | 'BTC'>('TRC20');
  
  return (
    <div className="p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Dear user, please check that information you have provided is correct to ensure that your withdrawal will not be delayed, thank you.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-1">Full Name</div>
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-transparent outline-none"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-1">Crypto Address</div>
          <input 
            type="text" 
            placeholder="Crypto Address" 
            className="w-full bg-transparent outline-none"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-3">Network</div>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="network" 
                checked={network === 'TRC20'} 
                onChange={() => setNetwork('TRC20')} 
                className="mr-2"
              />
              TRC20
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="network" 
                checked={network === 'ERC20'} 
                onChange={() => setNetwork('ERC20')} 
                className="mr-2"
              />
              ERC20
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="network" 
                checked={network === 'BTC'} 
                onChange={() => setNetwork('BTC')} 
                className="mr-2"
              />
              BTC
            </label>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-1">Phone Number</div>
          <input 
            type="text" 
            placeholder="Phone Number" 
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>
      
      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-200 font-medium mt-6">
        CONFIRM
      </button>
    </div>
  );
};

export default FundInfo;