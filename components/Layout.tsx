import React, { ReactNode } from 'react';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* Your layout structure here */}
      {children}
    </div>
  );
};

export default Layout;
