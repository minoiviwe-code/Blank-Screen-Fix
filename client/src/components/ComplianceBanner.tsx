import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ComplianceBanner: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-accent/50 border-b border-accent-foreground/10 px-4 py-2 flex items-center justify-center text-sm font-medium text-foreground/80 z-50 relative"
    >
      <AlertCircle className="w-4 h-4 mr-2 text-primary" />
      <span>Governed Pilot Platform — No Custody — No Real Funds</span>
    </motion.div>
  );
};

export default ComplianceBanner;
