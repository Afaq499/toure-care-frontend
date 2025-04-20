import React from 'react';
import { userData } from '../data/mockData';
import WalletCard from '../components/WalletCard';
import { Link } from 'react-router-dom';
import { UserCircle, MapPin, HelpCircle, Send } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
            <UserCircle size={40} className="text-gray-600" />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold">{userData.name}</h2>
            <div className="flex items-center text-sm text-gray-500">
              <span>Referral Code:</span>
              <span className="ml-1 font-medium">{userData.referralCode}</span>
            </div>
          </div>
        </div>
      </div>

      <WalletCard 
        walletBalance={userData.walletBalance}
        todaysRewards={userData.todaysRewards}
        dailyTravel={userData.dailyTravel}
        completedTravel={userData.completedTravel}
      />

      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        <Link to="#" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
            <MapPin size={20} className="text-blue-600" />
          </div>
          <span className="text-xs">T&C</span>
        </Link>
        <Link to="#" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
            <UserCircle size={20} className="text-green-600" />
          </div>
          <span className="text-xs">Agent</span>
        </Link>
        <Link to="#" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1">
            <HelpCircle size={20} className="text-purple-600" />
          </div>
          <span className="text-xs">FAQs</span>
        </Link>
        <Link to="#" className="flex flex-col items-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
            <Send size={20} className="text-yellow-600" />
          </div>
          <span className="text-xs">About Us</span>
        </Link>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Destinations</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg overflow-hidden shadow-sm">
            <img 
              src="https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Destination" 
              className="w-full h-32 object-cover"
            />
            <div className="p-2 bg-white">
              <h4 className="font-medium text-sm">Bali, Indonesia</h4>
              <div className="text-xs text-gray-500">Starting from $299</div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <img 
              src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Destination" 
              className="w-full h-32 object-cover"
            />
            <div className="p-2 bg-white">
              <h4 className="font-medium text-sm">Santorini, Greece</h4>
              <div className="text-xs text-gray-500">Starting from $459</div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <img 
              src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Destination" 
              className="w-full h-32 object-cover"
            />
            <div className="p-2 bg-white">
              <h4 className="font-medium text-sm">Tokyo, Japan</h4>
              <div className="text-xs text-gray-500">Starting from $399</div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <img 
              src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Destination" 
              className="w-full h-32 object-cover"
            />
            <div className="p-2 bg-white">
              <h4 className="font-medium text-sm">Cancun, Mexico</h4>
              <div className="text-xs text-gray-500">Starting from $349</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;