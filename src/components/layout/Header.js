'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Dropdown, Avatar, Drawer, Space, Input, Badge } from 'antd';
import {
  MenuOutlined, SearchOutlined, UserOutlined, HeartOutlined,
  BookOutlined, LogoutOutlined, CrownOutlined, SettingOutlined,
  HomeOutlined, AppstoreOutlined, TrophyOutlined, EditOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';
import styles from './Header.module.css';

const navItems = [
  { key: '/', label: 'Trang Chủ', icon: <HomeOutlined /> },
  { key: '/manga', label: 'Danh Sách', icon: <BookOutlined /> },
  { key: '/categories', label: 'Thể Loại', icon: <AppstoreOutlined /> },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const userMenuItems = [
    { key: 'profile', label: <Link href="/profile">Hồ sơ cá nhân</Link>, icon: <UserOutlined /> },
    { key: 'favorite', label: <Link href="/favorite">Truyện yêu thích</Link>, icon: <HeartOutlined /> },
    ...(user?.role === 'author' || user?.role === 'admin' ? [
      { type: 'divider' },
      { key: 'author', label: <Link href="/author">Quản lý truyện</Link>, icon: <EditOutlined /> },
    ] : []),
    ...(user?.role === 'admin' ? [
      { key: 'admin', label: <Link href="/admin">Quản trị hệ thống</Link>, icon: <CrownOutlined /> },
    ] : []),
    { type: 'divider' },
    { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true, onClick: logout },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <BookOutlined className={styles.logoIcon} />
            <span className={styles.logoText}>ComicVerse</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            {navItems.map(item => (
              <Link
                key={item.key}
                href={item.key}
                className={`${styles.navLink} ${pathname === item.key ? styles.navLinkActive : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              type="text"
              icon={<SearchOutlined />}
              className={styles.iconBtn}
              onClick={() => setSearchOpen(!searchOpen)}
            />

            {isLoggedIn ? (
              <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                <div className={styles.userInfo}>
                  <Avatar src={user?.avatar} size={34} icon={<UserOutlined />} />
                  <span className={styles.username}>{user?.username}</span>
                </div>
              </Dropdown>
            ) : (
              <Space size={8}>
                <Button type="primary" ghost onClick={() => setLoginOpen(true)}>Đăng nhập</Button>
                <Button type="primary" onClick={() => setRegisterOpen(true)} className={styles.registerBtn}>Đăng ký</Button>
              </Space>
            )}

            <Button
              type="text"
              icon={<MenuOutlined />}
              className={styles.hamburger}
              onClick={() => setDrawerOpen(true)}
            />
          </div>
        </div>

        {/* Search Expand */}
        {searchOpen && (
          <div className={styles.searchBar}>
            <div className={styles.container}>
              <Input.Search
                placeholder="Tìm kiếm truyện, tác giả..."
                size="large"
                autoFocus
                onSearch={() => setSearchOpen(false)}
                style={{ maxWidth: 600, margin: '0 auto', display: 'block' }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <Link href="/" className={styles.logo} onClick={() => setDrawerOpen(false)}>
            <BookOutlined className={styles.logoIcon} />
            <span className={styles.logoText}>ComicVerse</span>
          </Link>
        }
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
        styles={{ body: { padding: 0 } }}
      >
        <div className={styles.drawerNav}>
          {navItems.map(item => (
            <Link
              key={item.key}
              href={item.key}
              className={`${styles.drawerLink} ${pathname === item.key ? styles.drawerLinkActive : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <Link href="/favorite" className={styles.drawerLink} onClick={() => setDrawerOpen(false)}>
            <HeartOutlined />
            <span>Yêu Thích</span>
          </Link>
          {!isLoggedIn && (
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button type="primary" block onClick={() => { setDrawerOpen(false); setLoginOpen(true); }}>Đăng nhập</Button>
              <Button block onClick={() => { setDrawerOpen(false); setRegisterOpen(true); }}>Đăng ký</Button>
            </div>
          )}
        </div>
      </Drawer>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSwitchToRegister={() => { setLoginOpen(false); setRegisterOpen(true); }} />
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} onSwitchToLogin={() => { setRegisterOpen(false); setLoginOpen(true); }} />
    </>
  );
}
