import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Logo from '../components/Logo';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';

const ReferralCode: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleCopyCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast.success('Referral code copied to clipboard!');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-[80vh] bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="my-12">
        <Logo />
      </div>
      
      <div className="w-48 h-48 bg-white p-2 rounded-lg mb-8">
        <QRCodeSVG
          value={user.referralCode || ''}
          size={180}
          level="H"
          includeMargin={true}
          className="w-full h-full"
        />
      </div>
      
      <div className="text-center mb-6">
        <div className="text-sm opacity-80 mb-1">Referral Code</div>
        <div className="text-xl font-bold">{user.referralCode}</div>
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