import React from 'react';
import { useUser } from '@/hooks/use-auth';
import { usePools } from '@/hooks/use-pools';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/utils';
import { Card, Badge } from '@/components/PremiumUI';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: pools, isLoading: poolsLoading } = usePools();
  const { currency } = useCurrency();
  const [, setLocation] = useLocation();

  if (userLoading || poolsLoading) {
    return <div className="flex h-[50vh] items-center justify-center text-primary animate-pulse">Loading dashboard...</div>;
  }

  if (!user) {
    setLocation('/auth');
    return null;
  }

  const activePools = pools?.length || 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold">Welcome back, {user.username}</h1>
        <p className="text-muted-foreground mt-2 text-lg">Here's what's happening in your Ubuntu network today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary to-orange-500 text-white border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-semibold text-white/80">Ubuntu Score</h3>
            <ShieldCheck className="w-6 h-6 text-white/80" />
          </div>
          <div className="relative z-10">
            <p className="text-5xl font-display font-bold">{user.ubuntuScore}</p>
            <p className="text-sm text-white/80 mt-2 font-medium">Trust Reputation Status: <span className="text-white">Excellent</span></p>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Active Pools</h3>
            <Users className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-4xl font-display font-bold text-foreground">{activePools}</p>
            <p className="text-sm text-muted-foreground mt-2 font-medium">Community Stokvels joined</p>
          </div>
        </Card>

        <Card className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Network Status</h3>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-4xl font-display font-bold text-foreground">Active</p>
            <p className="text-sm text-muted-foreground mt-2 font-medium">All governance checks passed</p>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold">Available Pools</h2>
          <Link href="/create-pool" className="text-primary font-semibold hover:underline flex items-center gap-1">
            Create New <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {pools?.length === 0 ? (
          <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No active pools</h3>
            <p className="text-muted-foreground mb-6">There are currently no stokvels available to join.</p>
            <Link href="/create-pool" className="inline-flex items-center justify-center h-11 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Start the first one
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pools?.map((pool) => (
              <Card key={pool.id} className="flex flex-col group hover:border-primary/50 cursor-pointer" onClick={() => setLocation(`/pool/${pool.id}`)}>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary">{pool.currency}</Badge>
                    <span className="text-xs font-semibold text-muted-foreground">ID: #{pool.id}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">{pool.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{pool.description}</p>
                </div>
                <div className="p-6 border-t border-border/50 bg-muted/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Target</p>
                    <p className="font-bold text-foreground">{formatCurrency(pool.targetAmount, pool.currency)}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
