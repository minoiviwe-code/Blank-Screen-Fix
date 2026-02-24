import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Layout from './components/Layout';
import ComplianceBanner from './components/ComplianceBanner';
import { CurrencyProvider } from './contexts/CurrencyContext';

// Using direct imports for simplicity and robust Wouter routing 
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contribute from './pages/Contribute';
import CreatePool from './pages/CreatePool';
import PoolAgreement from './pages/PoolAgreement';
import PoolDetails from './pages/PoolDetails';
import KycVerification from './pages/KycVerification';
import FAQ from './pages/FAQ';
import Prospectus from './pages/Prospectus';

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Auth} />
      <Route path="/auth" component={Auth} />
      
      {/* Protected Layout Routes */}
      <Route path="/dashboard"><Layout><Dashboard /></Layout></Route>
      <Route path="/admin"><Layout><AdminDashboard /></Layout></Route>
      <Route path="/create-pool"><Layout><CreatePool /></Layout></Route>
      <Route path="/verify"><Layout><KycVerification /></Layout></Route>
      <Route path="/agreement/:poolId"><Layout><PoolAgreement /></Layout></Route>
      <Route path="/contribute/:id"><Layout><Contribute /></Layout></Route>
      <Route path="/pool/:id"><Layout><PoolDetails /></Layout></Route>
      <Route path="/faq"><Layout><FAQ /></Layout></Route>
      <Route path="/prospectus"><Layout><Prospectus /></Layout></Route>
      
      {/* Fallback */}
      <Route>
        <Layout>
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-muted-foreground">The page you're looking for doesn't exist.</p>
          </div>
        </Layout>
      </Route>
    </Switch>
  );
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <div className="flex flex-col min-h-screen">
          <ComplianceBanner />
          <AppRouter />
        </div>
      </CurrencyProvider>
    </QueryClientProvider>
  );
};

export default App;
