import React from 'react';
import { Card } from '@/components/PremiumUI';
import { HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    { q: "What is an Ubuntu Score?", a: "Your Ubuntu Score represents your trust and reliability within the network. It increases as you consistently fulfill your Stokvel commitments." },
    { q: "How are funds secured?", a: "Ubuntu Pools operates on a non-custodial pilot basis. We govern the logic and track contributions, but actual clearing relies on your trusted network." },
    { q: "Can I use multiple currencies?", a: "Yes, the diaspora module supports ZAR, USD, and GBP to facilitate international contributions seamlessly." }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-display font-bold">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i} className="p-6 hover:shadow-xl transition-shadow cursor-pointer group">
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{faq.q}</h3>
            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
