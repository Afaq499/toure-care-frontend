import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Logo from '../components/Logo';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    username: '',
    withdrawPassword: '',
    loginPassword: '',
    referralCode: '',
  });
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <h1 className="text-2xl font-bold mb-8">Register Now</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Phone Number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Withdraw Password</label>
            <input
              type="password"
              name="withdrawPassword"
              value={formData.withdrawPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Withdraw Password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Login Password</label>
            <input
              type="password"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Login Password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Referral Code (Optional)</label>
            <input
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Referral Code"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 mt-6"
          >
            {loading ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 