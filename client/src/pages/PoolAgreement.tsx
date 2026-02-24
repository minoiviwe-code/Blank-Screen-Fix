import React from 'react';
import { Card, Button } from '@/components/PremiumUI';
import { useRoute } from 'wouter';
import { FileSignature } from 'lucide-react';

const PoolAgreement: React.FC = () => {
  const [, params] = useRoute('/agreement/:poolId');
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-8">
        <FileSignature className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-display font-bold">Ubuntu Smart Agreement</h1>
        <p className="text-muted-foreground mt-2">Pool ID: #{params?.poolId}</p>
      </div>

      <Card className="p-8 prose prose-slate max-w-none">
        <h3>1. Philosophy & Governance</h3>
        <p>This Stokvel operates on the principles of Ubuntu: "I am because we are." Members agree to act in good faith and prioritize community prosperity over individual opportunistic behavior.</p>
        
        <h3>2. Financial Commitments</h3>
        <p>By contributing to this pool, you accept the target parameters defined by the creator. Failure to meet scheduled contributions will negatively impact your global Ubuntu Score.</p>
        
        <h3>3. Non-Custodial Notice</h3>
        <p>The platform acts merely as a ledger and governance engine. Funds are managed via peer-to-peer mechanisms outside the direct custody of Ubuntu Pools.</p>
        
        <div className="mt-12 pt-6 border-t flex gap-4 justify-end not-prose">
          <Button variant="outline" onClick={() => window.history.back()}>Decline</Button>
          <Button onClick={() => window.history.back()}>I Agree</Button>
        </div>
      </Card>
    </div>
  );
};

export default PoolAgreement;
