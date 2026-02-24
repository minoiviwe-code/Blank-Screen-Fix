import React from 'react';
import { usePool } from '@/hooks/use-pools';
import { useContributions } from '@/hooks/use-contributions';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, Badge, Button } from '@/components/PremiumUI';
import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { Target, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

const PoolDetails: React.FC = () => {
  const [, params] = useRoute('/pool/:id');
  const poolId = Number(params?.id);
  
  const { data: pool, isLoading: poolLoading } = usePool(poolId);
  const { data: contributions, isLoading: contLoading } = useContributions(poolId);

  if (poolLoading || contLoading) return <div className="text-center py-20 text-primary font-medium animate-pulse">Loading pool details...</div>;
  if (!pool) return <div className="text-center py-20 text-destructive font-bold">Pool not found.</div>;

  const totalContributed = contributions?.reduce((sum, c) => sum + parseFloat(c.amount as string), 0) || 0;
  const target = parseFloat(pool.targetAmount as string);
  const progress = Math.min((totalContributed / target) * 100, 100);
  const contributorsCount = new Set(contributions?.map(c => c.userId)).size;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary">{pool.currency}</Badge>
            <Badge variant="outline">ID: {pool.id}</Badge>
          </div>
          <h1 className="text-4xl font-display font-bold mb-2">{pool.name}</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">{pool.description}</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/agreement/${pool.id}`}>
            <Button variant="outline" className="w-full md:w-auto">View Agreement</Button>
          </Link>
          <Link href={`/contribute/${pool.id}`}>
            <Button className="w-full md:w-auto">Contribute Now</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Funding Progress
          </h3>
          
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">Raised</p>
              <p className="text-3xl font-display font-bold">{formatCurrency(totalContributed, pool.currency)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">Target</p>
              <p className="text-xl font-display font-semibold text-muted-foreground">{formatCurrency(target, pool.currency)}</p>
            </div>
          </div>
          
          <div className="h-4 w-full bg-muted rounded-full overflow-hidden mt-4">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${progress}%` }} 
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
            </motion.div>
          </div>
          <p className="text-right text-sm font-semibold text-primary mt-2">{progress.toFixed(1)}% Funded</p>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <Users className="w-12 h-12 text-secondary mb-4" />
          <h3 className="text-3xl font-display font-bold">{contributorsCount}</h3>
          <p className="text-muted-foreground font-medium mt-1">Active Contributors</p>
          <Badge variant="success" className="mt-4"><CheckCircle2 className="w-3 h-3 mr-1" /> Verified Network</Badge>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-display font-bold mb-6">Contribution Ledger</h2>
        <Card className="overflow-hidden">
          {contributions?.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No contributions recorded yet. Be the first to start the stokvel!</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {contributions?.map((c) => (
                <div key={c.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                      U{c.userId}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">User #{c.userId}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(c.createdAt!)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatCurrency(c.amount as string, pool.currency)}</p>
                    <Badge variant={c.status === 'completed' ? 'success' : 'outline'} className="mt-1">
                      {c.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default PoolDetails;
