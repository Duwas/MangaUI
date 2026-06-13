'use client';
import { ConfigProvider, App as AntApp } from 'antd';
import viVN from 'antd/locale/vi_VN';
import themeConfig from '@/theme/themeConfig';
import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
export default function AntdProvider({ children }) {
  return (
    <ConfigProvider theme={themeConfig} locale={viVN}>
      <AntApp>
        <AuthProvider>
          <AppLayout>
          <main style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
            {children}
          </main>
          </AppLayout>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
}
