import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userData } from '../data/mockData';

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState<string>('0.00');
  
  const handleAmountSelect = (value: number) => {
    setAmount(value.toFixed(2));
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Link to="/deposit/history" className="text-orange-500 text-sm">
          Recharge History
        </Link>
      </div>
      
      <p className="text-sm text-gray-500 mb-6">
        Please enter the recharge amount before you click submit
      </p>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="text-sm text-gray-500 mb-2">Wallet Balance</div>
        <div className="font-semibold">$ {userData.walletBalance.toFixed(2)}</div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Recharge Amount</div>
        <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
          <div className="text-gray-500">Amount</div>
          <div className="font-semibold">$ {amount}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button 
          onClick={() => handleAmountSelect(100)}
          className="bg-white rounded-lg shadow-sm p-3 text-center hover:bg-gray-50 transition"
        >
          100
        </button>
        <button 
          onClick={() => handleAmountSelect(200)}
          className="bg-white rounded-lg shadow-sm p-3 text-center hover:bg-gray-50 transition"
        >
          200
        </button>
        <button 
          onClick={() => handleAmountSelect(500)}
          className="bg-white rounded-lg shadow-sm p-3 text-center hover:bg-gray-50 transition"
        >
          500
        </button>
        <button 
          onClick={() => handleAmountSelect(1000)}
          className="bg-white rounded-lg shadow-sm p-3 text-center hover:bg-gray-50 transition"
        >
          1000
        </button>
        <button 
          onClick={() => handleAmountSelect(3000)}
          className="bg-white rounded-lg shadow-sm p-3 text-center hover:bg-gray-50 transition"
        >
          3000
        </button>
        <button 
          onClick={() => handleAmountSelect(5000)}
          className="bg-white rounded-lg shadow-sm p-3 text-center hover:bg-gray-50 transition"
        >
          5000
        </button>
      </div>
      
      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-200 font-medium">
        Submit
      </button>
    </div>
  );
};

export default Deposit;