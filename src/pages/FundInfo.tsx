import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { toast } from 'react-hot-toast';

const FundInfo: React.FC = () => {
  const [network, setNetwork] = useState<'TRC20' | 'ERC20' | 'BTC'>('TRC20');
  const [formData, setFormData] = useState({
    fullName: '',
    cryptoAddress: '',
    phoneNumber: '',
    network: 'TRC20'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [hasExistingAccount, setHasExistingAccount] = useState(false);

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const response = await apiService.getUser();
        const userData = response.data.data;
        
        // Pre-populate form with user data if available
        if (userData?.account) {
          setFormData({
            fullName: userData.account.fullName || '',
            cryptoAddress: userData.account.cryptoAddress || '',
            phoneNumber: userData.account.phoneNumber || '',
            network: userData.account.network || 'TRC20'
          });
          
          // Set network if available
          if (userData.account.network) {
            setNetwork(userData.account.network);
          }

          // Set hasExistingAccount if we have account data
          setHasExistingAccount(true);
        }
      } catch (error) {
        console.error('Error fetching user account:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserAccount();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasExistingAccount) return; // Prevent changes in read-only mode
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      await apiService.createAccount({
        ...formData,
        network
      });

      // Handle successful response
      toast.success('Account information saved successfully!');
      setHasExistingAccount(true);
    } catch (error) {
      // Error is already handled by the API service interceptor
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          {hasExistingAccount 
            ? "Your account information is shown below."
            : "Dear user, please check that information you have provided is correct to ensure that your withdrawal will not be delayed, thank you."
          }
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-1">Full Name</div>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name" 
            className={`w-full bg-transparent outline-none ${hasExistingAccount ? 'text-gray-700 cursor-not-allowed' : ''}`}
            readOnly={hasExistingAccount}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-1">Crypto Address</div>
          <input 
            type="text" 
            name="cryptoAddress"
            value={formData.cryptoAddress}
            onChange={handleInputChange}
            placeholder="Crypto Address" 
            className={`w-full bg-transparent outline-none ${hasExistingAccount ? 'text-gray-700 cursor-not-allowed' : ''}`}
            readOnly={hasExistingAccount}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-3">Network</div>
          <div className="flex space-x-4">
            <label className={`flex items-center ${hasExistingAccount ? 'cursor-not-allowed' : ''}`}>
              <input 
                type="radio" 
                name="network" 
                checked={network === 'TRC20'} 
                onChange={() => !hasExistingAccount && setNetwork('TRC20')} 
                className="mr-2"
                disabled={hasExistingAccount}
              />
              TRC20
            </label>
            <label className={`flex items-center ${hasExistingAccount ? 'cursor-not-allowed' : ''}`}>
              <input 
                type="radio" 
                name="network" 
                checked={network === 'ERC20'} 
                onChange={() => !hasExistingAccount && setNetwork('ERC20')} 
                className="mr-2"
                disabled={hasExistingAccount}
              />
              ERC20
            </label>
            <label className={`flex items-center ${hasExistingAccount ? 'cursor-not-allowed' : ''}`}>
              <input 
                type="radio" 
                name="network" 
                checked={network === 'BTC'} 
                onChange={() => !hasExistingAccount && setNetwork('BTC')} 
                className="mr-2"
                disabled={hasExistingAccount}
              />
              BTC
            </label>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-500 mb-1">Phone Number</div>
          <input 
            type="text" 
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number" 
            className={`w-full bg-transparent outline-none ${hasExistingAccount ? 'text-gray-700 cursor-not-allowed' : ''}`}
            readOnly={hasExistingAccount}
          />
        </div>
      </div>
      
      {!hasExistingAccount && (
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-200 font-medium mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'PROCESSING...' : 'CONFIRM'}
        </button>
      )}
    </div>
  );
};

export default FundInfo;