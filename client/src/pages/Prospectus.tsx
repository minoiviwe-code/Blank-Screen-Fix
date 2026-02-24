import React from 'react';
import { Card } from '@/components/PremiumUI';

const Prospectus: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-display font-bold mb-8 text-center">Platform Prospectus</h1>
      <Card className="p-8 md:p-12">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Vision & Mission</h2>
          <p>
            Ubuntu Pools is designed to digitize and govern the traditional South African Stokvel model for the modern, global diaspora.
            Our mission is to foster community prosperity through transparent, reliable, and frictionless peer-to-peer savings pools.
          </p>
          <h2>The Ubuntu Score Engine</h2>
          <p>
            At the heart of the platform is the Ubuntu Score, an algorithmic trust rating that relies on participation history rather than traditional credit checks. It empowers the unbanked and builds social collateral.
          </p>
          <h2>Legal Framework</h2>
          <p>
            Currently operating as a governed pilot, this platform asserts no custody over real funds. It acts strictly as a decentralized ledger and coordination protocol.
          </p>
        </article>
      </Card>
    </div>
  );
};

export default Prospectus;
