'use client';
import { ConfigProvider, App as AntApp } from 'antd';
import viVN from 'antd/locale/vi_VN';
import themeConfig from '@/theme/themeConfig';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AntdProvider({ children }) {
  return (
    <ConfigProvider theme={themeConfig} locale={viVN}>
      <AntApp>
        <AuthProvider>
          <Header />
          <main style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
}
