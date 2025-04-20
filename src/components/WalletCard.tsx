import React from 'react';

interface WalletCardProps {
  walletBalance: number;
  todaysRewards: number;
  dailyTravel: number;
  completedTravel: number;
}

const WalletCard: React.FC<WalletCardProps> = ({ 
  walletBalance, 
  todaysRewards,
  dailyTravel,
  completedTravel
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="p-4 border-r border-b">
          <div className="text-sm text-gray-500">Wallet Balance</div>
          <div className="text-lg font-semibold">$ {walletBalance.toFixed(2)}</div>
        </div>
        <div className="p-4 border-b">
          <div className="text-sm text-gray-500">Today's Rewards</div>
          <div className="text-lg font-semibold">$ {todaysRewards.toFixed(2)}</div>
        </div>
        <div className="p-4 border-r">
          <div className="text-sm text-gray-500">Daily Travel</div>
          <div className="text-lg font-semibold">{dailyTravel}</div>
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-500">Completed Travel</div>
          <div className="text-lg font-semibold">{completedTravel}</div>
        </div>
      </div>
      <div className="p-4">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-200 font-medium">
          Start Travel
        </button>
      </div>
    </div>
  );
};

export default WalletCard;