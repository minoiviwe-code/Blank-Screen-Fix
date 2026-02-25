import React, { useState } from 'react';
import { useCreatePool } from '@/hooks/use-pools';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button, Input, Label, Card } from '@/components/PremiumUI';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

const CreatePool: React.FC = () => {
  const { currency } = useCurrency();
  const createPool = useCreatePool();
  const [, setLocation] = useLocation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPool.mutate({
      name,
      description,
      targetAmount: targetAmount, // API coercion will handle string->numeric
      currency,
    }, {
      onSuccess: () => {
        setLocation('/dashboard');
      }
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
            alt="Community collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-4xl font-display font-bold text-white">Create a Pool</h1>
            <p className="text-white/80 mt-2">Initialize a new community stokvel. Ensure you have consensus from your peers.</p>
          </div>
        </div>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Pool Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. Soweto Education Fund" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mission / Description</Label>
            <textarea 
              id="description" 
              className="flex w-full rounded-xl border-2 border-border/50 bg-background/50 px-4 py-3 text-base transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 min-h-[120px] resize-none"
              placeholder="Describe the goal of this stokvel..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount ({currency})</Label>
            <Input 
              id="targetAmount" 
              type="number" 
              min="1" 
              step="0.01" 
              placeholder="10000" 
              value={targetAmount} 
              onChange={(e) => setTargetAmount(e.target.value)} 
              required 
            />
          </div>

          {createPool.error && (
            <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold">
              {createPool.error.message}
            </div>
          )}

          <div className="pt-4 border-t border-border/50 flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setLocation('/dashboard')}>Cancel</Button>
            <Button type="submit" isLoading={createPool.isPending} size="lg">Initialize Pool</Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreatePool;
