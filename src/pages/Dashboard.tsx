import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import WalletCard from '../components/WalletCard';
import { Link } from 'react-router-dom';
import { UserCircle, MapPin, HelpCircle, Send } from 'lucide-react';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
            <UserCircle size={40} className="text-gray-600" />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <div className="flex items-center text-sm text-gray-500">
              <span>Referral Code:</span>
              <span className="ml-1 font-medium">{user.referralCode}</span>
            </div>
          </div>
        </div>
      </div>

      <WalletCard 
        walletBalance={user.balance || 0}
        todaysRewards={user.todaysEarnings || 0}
        dailyTravel={user.dailyTravel || 0}
        completedTravel={user.taskStats?.completedTasks || 0}
      />

      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        <Link to="/terms-and-conditions" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
            <MapPin size={20} className="text-blue-600" />
          </div>
          <span className="text-xs">T&C</span>
        </Link>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => {
          // @ts-ignore - Tawk_API is loaded from external script
          if (window.Tawk_API) {
            // @ts-ignore
            window.Tawk_API.toggle();
          }
        }}>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
            <UserCircle size={20} className="text-green-600" />
          </div>
          <span className="text-xs">Agent</span>
        </div>
        <Link to="/faq" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1">
            <HelpCircle size={20} className="text-purple-600" />
          </div>
          <span className="text-xs">FAQs</span>
        </Link>
        {/* <Link to="#" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
            <Send size={20} className="text-yellow-600" />
          </div>
          <span className="text-xs">About Us</span>
        </Link> */}
      </div>
    </div>
  );
};

export default Dashboard;