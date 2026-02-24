import React, { useState } from 'react';
import { Card, Button, Input, Label, Badge } from '@/components/PremiumUI';
import { ShieldCheck, Upload, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const KycVerification: React.FC = () => {
  const [status, setStatus] = useState<'pending' | 'uploading' | 'verified'>('pending');

  const handleSimulate = () => {
    setStatus('uploading');
    setTimeout(() => {
      setStatus('verified');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-display font-bold">Identity Verification</h1>
        <p className="text-muted-foreground mt-2">Establish trust within the Ubuntu network.</p>
      </div>

      <Card className="p-8">
        {status === 'verified' ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Verification Complete</h2>
            <p className="text-muted-foreground mb-8">Your identity has been secured. You have full access to create and join stokvels.</p>
            <Badge variant="success" className="text-lg py-2 px-6">Ubuntu Trust Level: Tier 1</Badge>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:bg-muted/30 transition-colors cursor-pointer group">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
              <p className="font-semibold mb-1">Upload Government ID</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, or PDF (Max 5MB)</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Full Legal Name</Label>
                <Input placeholder="Nelson Mandela" disabled={status === 'uploading'} />
              </div>
              <div>
                <Label>ID / Passport Number</Label>
                <Input placeholder="XX00XX00XX" disabled={status === 'uploading'} />
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleSimulate} 
              isLoading={status === 'uploading'}
            >
              {status === 'uploading' ? 'Verifying Identity...' : 'Submit Documents'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default KycVerification;
