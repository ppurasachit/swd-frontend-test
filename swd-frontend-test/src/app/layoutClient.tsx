// src/app/LayoutClient.tsx
'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../lib/i18n'; // Import i18n configuration
import './layout.scss';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Determine layout class based on route
  const getContentWrapperClass = () => {
    if (pathname === '/') {
      return 'content-wrapper centered'; // Home page - centered
    } else {
      return 'content-wrapper top-aligned'; // Other pages - top aligned
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFA200',
          colorSuccess: '#6EDA78',
        },
      }}
    >
      <div className="app-layout">
        <LanguageSwitcher />
        <div className="gradient-background">
          <div className={getContentWrapperClass()}>
            {children}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default LayoutClient;