import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Clock, Wallet, Share2, CreditCard, User, HelpCircle, LogOut } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import Logo from './Logo';

const Layout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/': return '';
      case '/travel-history': return 'Travel History';
      case '/deposit': return 'Deposit';
      case '/referral': return 'Share Referral Code';
      case '/fund-info': return 'Fund Info';
      default: return '';
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full md:max-w-[50%] md:mx-auto">
        <header className="bg-gray-900 text-white py-4 px-4 flex items-center justify-between">
          {location.pathname !== '/' && (
            <button onClick={goBack} className="flex items-center">
              &lt; {getTitle()}
            </button>
          )}
          <button onClick={toggleMenu} className="text-white">
            <Menu size={24} />
          </button>
          {location.pathname === '/' && <div className="flex-1 flex justify-center"><Logo /></div>}
        </header>

        {/* Mobile menu */}
        <div className={`fixed inset-y-0 left-0 w-1/2 bg-gray-900 z-50 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <Logo />
            <button onClick={toggleMenu} className="text-white">
              <X size={24} />
            </button>
          </div>
          
          <nav className="px-4 py-6">
            <ul className="space-y-6">
              <li>
                <Link to="/" className="flex items-center text-white" onClick={toggleMenu}>
                  <Home size={20} className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/travel-history" className="flex items-center text-white" onClick={toggleMenu}>
                  <Clock size={20} className="mr-3" />
                  <span>Travel History</span>
                </Link>
              </li>
              <li>
                <Link to="/deposit" className="flex items-center text-white" onClick={toggleMenu}>
                  <Wallet size={20} className="mr-3" />
                  <span>Deposit</span>
                </Link>
              </li>
              <li>
                <Link to="/referral" className="flex items-center text-white" onClick={toggleMenu}>
                  <Share2 size={20} className="mr-3" />
                  <span>Referral Code</span>
                </Link>
              </li>
              <li>
                <Link to="/fund-info" className="flex items-center text-white" onClick={toggleMenu}>
                  <CreditCard size={20} className="mr-3" />
                  <span>Fund Info</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center text-white" onClick={toggleMenu}>
                  <User size={20} className="mr-3" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center text-white" onClick={toggleMenu}>
                  <HelpCircle size={20} className="mr-3" />
                  <span>Help</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
            <button onClick={handleLogout} className="flex items-center text-white w-full">
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <main className="pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;