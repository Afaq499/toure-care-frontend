import React from 'react';
import { TravelRecord } from '../types';

interface TravelCardProps {
  travel: TravelRecord;
}

const TravelCard: React.FC<TravelCardProps> = ({ travel }) => {
  const statusColor = travel.status === 'completed' 
    ? 'bg-green-500' 
    : travel.status === 'pending' 
      ? 'bg-purple-500' 
      : 'bg-gray-500';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${travel.imageUrl})` }}
      >
        <div className="flex justify-end p-2">
          <span className={`${statusColor} text-white text-sm py-1 px-3 rounded-full`}>
            {travel.status.charAt(0).toUpperCase() + travel.status.slice(1)}
          </span>
        </div>
        <div className="bg-gradient-to-t from-black to-transparent p-4 mt-24 text-white">
          <div className="text-sm opacity-80">{travel.date}</div>
          <div className="text-lg font-semibold">{travel.title}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between border-b pb-2">
          <div className="text-sm text-gray-500">Price</div>
          <div className="font-semibold">USDT {travel.price.toFixed(2)}</div>
        </div>
        <div className="flex justify-between pt-2">
          <div className="text-sm text-gray-500">Rewards</div>
          <div className="font-semibold">USDT {travel.rewards.toFixed(2)}</div>
        </div>
      </div>
      {travel.status === 'pending' && (
        <div className="p-4 pt-0">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-200 font-medium">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelCard;