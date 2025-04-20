import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TravelHistory from './pages/TravelHistory';
import Deposit from './pages/Deposit';
import ReferralCode from './pages/ReferralCode';
import FundInfo from './pages/FundInfo';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="travel-history" element={<TravelHistory />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="referral" element={<ReferralCode />} />
          <Route path="fund-info" element={<FundInfo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;