"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, Dropdown, Avatar, Drawer, Space, Input, AutoComplete } from "antd";
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
import mangaApi from "@/services/mangaApi";

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
  const [searchOptions, setSearchOptions] = useState([]);
  const [allMangas, setAllMangas] = useState([]);

  useEffect(() => {
    if (searchOpen && allMangas.length === 0) {
      mangaApi.getApproved().then((res) => {
        setAllMangas(res.data || []);
      }).catch(console.error);
    }
  }, [searchOpen, allMangas.length]);

  const handleSearch = (value) => {
    if (!value) {
      setSearchOptions([]);
      return;
    }
    const filtered = allMangas
      .filter((m) => m.title?.toLowerCase().includes(value.toLowerCase()) || m.author?.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5)
      .map((m) => ({
        value: m.title,
        id: m.id,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={m.coverImage} alt={m.title} style={{ width: 30, height: 40, objectFit: "cover", borderRadius: 4 }} />
            <div>
              <div style={{ fontWeight: 500, color: "var(--text-primary)" }}>{m.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{m.author}</div>
            </div>
          </div>
        ),
      }));
    setSearchOptions(filtered);
  };

  const onSelect = (value, option) => {
    setSearchOpen(false);
    router.push(`/manga/${option.id}`);
  };

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
              <AutoComplete
                options={searchOptions}
                onSearch={handleSearch}
                onSelect={onSelect}
                style={{ width: "100%", maxWidth: 600, margin: "0 auto", display: "block" }}
                popupClassName={styles.searchDropdown}
              >
                <Input.Search
                  placeholder="Tìm kiếm truyện, tác giả..."
                  size="large"
                  autoFocus
                  onSearch={(val) => {
                    setSearchOpen(false);
                    if (val.trim()) {
                      router.push(`/manga?q=${encodeURIComponent(val.trim())}`);
                    }
                  }}
                  style={{
                    display: "flex",
                  }}
                />
              </AutoComplete>
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