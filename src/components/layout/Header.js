"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, Dropdown, Avatar, Drawer, Space, Input } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
  HeartOutlined,
  BookOutlined,
  LogoutOutlined,
  CrownOutlined,
  HomeOutlined,
  AppstoreOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

const navItems = [
  { key: "/", label: "Trang Chủ", icon: <HomeOutlined /> },
  { key: "/manga", label: "Danh Sách", icon: <BookOutlined /> },
  { key: "/categories", label: "Thể Loại", icon: <AppstoreOutlined /> },
];

export default function Header({ onSidebarClick, onLoginClick, onRegisterClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const role = user?.role?.toUpperCase();

  const userMenuItems = [
        {
          key: "profile",
          label: "Hồ sơ cá nhân",
          icon: <UserOutlined />,
        },

        {
          key: "favorite",
          label: <Link href="/favorite">Truyện yêu thích</Link>,
          icon: <HeartOutlined />,
        },

        ...(role === "AUTHOR" || role === "ADMIN"
          ? [
              { type: "divider" },
              {
                key: "author",
                label: <Link href="/author">Quản lý truyện</Link>,
                icon: <EditOutlined />,
              },
            ]
          : []),

        ...(role === "ADMIN"
          ? [
              {
                key: "admin",
                label: <Link href="/admin">Quản trị hệ thống</Link>,
                icon: <CrownOutlined />,
              },
            ]
          : []),

        { type: "divider" },

        {
          key: "logout",
          label: "Đăng xuất",
          icon: <LogoutOutlined />,
          danger: true,
        },
      ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/LogoCMW.png"
              alt="ComicWeb"
              width={150}
              height={150}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>ComicWeb</span>
          </Link>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.key}
                className={`${styles.navLink} ${
                  pathname === item.key ? styles.navLinkActive : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button
              type="text"
              icon={<SearchOutlined />}
              className={styles.iconBtn}
              onClick={() => setSearchOpen(!searchOpen)}
            />

            {isLoggedIn ? (
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: ({ key }) => {
                    if (key === "profile") {
                      router.push("/profile");
                    }

                    if (key === "logout") {
                      logout();
                    }
                  },
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    size="2x"
                    color="#1DB954"
                  />
                </div>
              </Dropdown>
            ) : (
              <Space size={8}>
                <Button type="primary" ghost onClick={onLoginClick}>
                  Đăng nhập
                </Button>

                <Button
                  type="primary"
                  onClick={onRegisterClick}
                  className={styles.registerBtn}
                >
                  Đăng ký
                </Button>
              </Space>
            )}

            <Button
              type="text"
              icon={<MenuOutlined />}
              className={styles.hamburger}
              onClick={() => {
                if (onSidebarClick) {
                  onSidebarClick();
                } else {
                  setDrawerOpen(true);
                }
              }}
            />
          </div>
        </div>

        {searchOpen && (
          <div className={styles.searchBar}>
            <div className={styles.container}>
              <Input.Search
                placeholder="Tìm kiếm truyện, tác giả..."
                size="large"
                autoFocus
                onSearch={() => setSearchOpen(false)}
                style={{
                  maxWidth: 600,
                  margin: "0 auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        )}
      </header>

      <Drawer
        title={
          <Link
            href="/"
            className={styles.logo}
            onClick={() => setDrawerOpen(false)}
          >
            <Image
              src="/images/LogoCMW.png"
              alt="ComicWeb"
              width={80}
              height={80}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>ComicWeb</span>
          </Link>
        }
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        size="default"
        closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
        styles={{ body: { padding: 0 } }}
      >
        <div className={styles.drawerNav}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.key}
              className={`${styles.drawerLink} ${
                pathname === item.key ? styles.drawerLinkActive : ""
              }`}
              onClick={() => setDrawerOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <Link
            href="/favorite"
            className={styles.drawerLink}
            onClick={() => setDrawerOpen(false)}
          >
            <HeartOutlined />
            <span>Yêu Thích</span>
          </Link>

          {!isLoggedIn && (
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Button type="primary" ghost onClick={onLoginClick}>
                Đăng nhập
              </Button>
              <Button type="primary" onClick={onRegisterClick} className={styles.registerBtn}>
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </Drawer>

      
    </>
  );
}