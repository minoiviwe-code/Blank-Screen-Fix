
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import ComplianceBanner from './components/ComplianceBanner';
import { CurrencyProvider } from './contexts/CurrencyContext';
import './index.css';

// Route-level code splitting
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Contribute = lazy(() => import('./pages/Contribute'));
const CreatePool = lazy(() => import('./pages/CreatePool'));
const PoolAgreement = lazy(() => import('./pages/PoolAgreement'));
const PoolDetails = lazy(() => import('./pages/PoolDetails'));
const KycVerification = lazy(() => import('./pages/KycVerification'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Prospectus = lazy(() => import('./pages/Prospectus'));

const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <Router>
        <ComplianceBanner />
        <Layout>
          <Suspense fallback={<div className="h-screen flex items-center justify-center font-black uppercase tracking-widest opacity-20">Ubuntu...</div>}>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/create-pool" element={<CreatePool />} />
              <Route path="/verify" element={<KycVerification />} />
              <Route path="/agreement/:poolId" element={<PoolAgreement />} />
              <Route path="/contribute/:id" element={<Contribute />} />
              <Route path="/pool/:id" element={<PoolDetails />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/prospectus" element={<Prospectus />} />
            </Routes>
          </Suspense>
        </Layout>
        <Analytics />
      </Router>
    </CurrencyProvider>
  );
};

export default App;
