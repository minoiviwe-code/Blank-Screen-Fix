import React, { createContext, useState, useContext, ReactNode } from 'react';

type CurrencyContextType = {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === null) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};
