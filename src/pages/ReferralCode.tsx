import React from 'react';
import { userData } from '../data/mockData';
import Logo from '../components/Logo';

const ReferralCode: React.FC = () => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(userData.referralCode);
    alert('Referral code copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[80vh] bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="my-12">
        <Logo />
      </div>
      
      <div className="w-48 h-48 bg-white p-2 rounded-lg mb-8">
        {/* This would be a QR code in a real app */}
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="text-black text-xs">QR Code for {userData.referralCode}</div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-sm opacity-80 mb-1">Referral Code</div>
        <div className="text-xl font-bold">{userData.referralCode}</div>
      </div>
      
      <button 
        onClick={handleCopyCode}
        className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-200 font-medium mb-6"
      >
        Copy Referral Code
      </button>
      
      <div className="mt-auto text-xs opacity-70 mb-4">
        Copyright © 2025 Tourism Cares. All Rights Reserved.
      </div>
    </div>
  );
};

export default ReferralCode;