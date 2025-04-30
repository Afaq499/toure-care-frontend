import React, { useState } from 'react';
import { TravelRecord } from '../types';
import RatingModal from './RatingModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface TravelCardProps {
  travel: TravelRecord & { canSubmit?: boolean };
}

const TravelCard: React.FC<TravelCardProps> = ({ travel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const userBalance = useSelector((state: RootState) => state.auth.user?.balance || 0);

  const statusColor = travel.status === 'completed' 
    ? 'bg-green-500' 
    : travel.status === 'pending' 
      ? 'bg-purple-500' 
      : 'bg-gray-500';

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4 hover:shadow-xl transition-shadow duration-300">
        <div 
          className="h-48 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${travel.imageUrl})` }}
        >
          <div className="absolute top-3 right-3">
            <span className={`${statusColor} text-white text-xs font-medium py-1.5 px-3 rounded-full shadow-md`}>
              {travel.status.charAt(0).toUpperCase() + travel.status.slice(1)}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-sm text-white/90 font-medium">{travel.date}</div>
            <div className="text-xl font-bold text-white mt-1">{travel.title}</div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div className="text-sm text-gray-600 font-medium">Price</div>
            <div className="text-lg font-bold text-gray-800">
              <span className="text-sm font-medium text-gray-500 mr-1">USDT</span>
              {travel.price?.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center pt-3">
            <div className="text-sm text-gray-600 font-medium">Rewards</div>
            <div className="text-lg font-bold text-green-600">
              <span className="text-sm font-medium text-gray-500 mr-1">USDT</span>
              {travel.rewards.toFixed(2)}
            </div>
          </div>
        </div>
        {travel.status === 'pending' && travel.canSubmit && (
          <div className="px-5 pb-5">
            <button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg transition duration-200 font-medium shadow-md hover:shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <RatingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskId={travel.id}
        userId={userId || ''}
        userBalance={userBalance}
        productPrice={travel.price}
        rewards={travel.rewards}
        isEdit={travel.isEdit}
      />
    </>
  );
};

export default TravelCard;