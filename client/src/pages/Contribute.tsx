import React, { useState } from 'react';
import { useCreateContribution } from '@/hooks/use-contributions';
import { usePool } from '@/hooks/use-pools';
import { Button, Input, Label, Card } from '@/components/PremiumUI';
import { motion } from 'framer-motion';
import { useRoute, useLocation } from 'wouter';
import { Info } from 'lucide-react';

const Contribute: React.FC = () => {
  const [, params] = useRoute('/contribute/:id');
  const poolId = Number(params?.id);
  const [, setLocation] = useLocation();
  
  const { data: pool } = usePool(poolId);
  const createContribution = useCreateContribution();
  const [amount, setAmount] = useState('');

  if (!pool) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContribution.mutate({
      poolId,
      amount,
      userId: 1,
    }, {
      onSuccess: () => {
        setLocation(`/pool/${poolId}`);
      }
    });
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto py-12">
      <Card className="p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
        
        <div className="text-center mb-8 pt-4">
          <h1 className="text-3xl font-display font-bold">Contribute</h1>
          <p className="text-muted-foreground mt-2">To <strong>{pool.name}</strong> ({pool.currency})</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-700 p-4 rounded-xl mb-8 flex gap-3 text-sm">
          <Info className="w-5 h-5 shrink-0" />
          <p>Your contribution affects your Ubuntu Score. Consistent and reliable participation increases your community standing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({pool.currency})</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
              <Input 
                id="amount" 
                type="number" 
                min="1" 
                step="0.01" 
                placeholder="100.00" 
                className="pl-10 text-lg font-semibold"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={createContribution.isPending}>
            Commit Funds
          </Button>
          <Button type="button" variant="ghost" className="w-full" onClick={() => window.history.back()}>
            Cancel
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default Contribute;
