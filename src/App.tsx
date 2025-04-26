import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TravelHistory from './pages/TravelHistory';
import Deposit from './pages/Deposit';
import ReferralCode from './pages/ReferralCode';
import FundInfo from './pages/FundInfo';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { rehydrate } from './store/slices/authSlice';
import './index.css';

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrate());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="travel-history" element={<TravelHistory />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="referral" element={<ReferralCode />} />
        <Route path="fund-info" element={<FundInfo />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="min-h-screen flex items-center justify-center">Loading...</div>} persistor={persistor}>
        <Router>
          <Toaster position="top-center" />
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;