'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
  DashboardOutlined, BookOutlined, AppstoreOutlined,
  UserOutlined, SolutionOutlined, CrownOutlined, LeftOutlined,
} from '@ant-design/icons';
import styles from './AdminLayout.module.css';

const { Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  { key: '/admin', icon: <DashboardOutlined />, label: <Link href="/admin">Dashboard</Link> },
  { key: '/admin/mangas', icon: <BookOutlined />, label: <Link href="/admin/mangas">Quản lý Truyện</Link> },
  { key: '/admin/categories', icon: <AppstoreOutlined />, label: <Link href="/admin/categories">Thể Loại</Link> },
  { key: '/admin/users', icon: <UserOutlined />, label: <Link href="/admin/users">Người Dùng</Link> },
  { key: '/admin/author-requests', icon: <SolutionOutlined />, label: <Link href="/admin/author-requests">Yêu Cầu Tác Giả</Link> },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        className={styles.sider}
        breakpoint="lg"
      >
        <div className={styles.siderHeader}>
          <CrownOutlined className={styles.adminIcon} />
          {!collapsed && <span className={styles.adminTitle}>Admin Panel</span>}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className={styles.menu}
          theme="dark"
        />
        <div className={styles.backLink}>
          <Link href="/">
            <LeftOutlined /> {!collapsed && 'Về trang chủ'}
          </Link>
        </div>
      </Sider>
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  );
}
