'use client';
import Link from 'next/link';
import { Row, Col, Space } from 'antd';
import { BookOutlined, GithubOutlined, FacebookOutlined, TwitterOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';

const categories = ['Hành Động', 'Tình Cảm', 'Phiêu Lưu', 'Giả Tưởng', 'Kinh Dị', 'Hài Hước'];
const links = [
  { label: 'Về chúng tôi', href: '#' },
  { label: 'Điều khoản sử dụng', href: '#' },
  { label: 'Chính sách bảo mật', href: '#' },
  { label: 'Liên hệ', href: '#' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[48, 32]}>
          <Col xs={24} sm={24} md={8}>
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <BookOutlined className={styles.logoIcon} />
                <span className={styles.logoText}>ComicVerse</span>
              </Link>
              <p className={styles.description}>
                Nền tảng đọc truyện tranh trực tuyến hàng đầu. Hàng ngàn bộ truyện được cập nhật liên tục mỗi ngày.
              </p>
              <Space size={12} className={styles.socials}>
                <a href="#" className={styles.socialIcon}><FacebookOutlined /></a>
                <a href="#" className={styles.socialIcon}><TwitterOutlined /></a>
                <a href="#" className={styles.socialIcon}><GithubOutlined /></a>
                <a href="#" className={styles.socialIcon}><MailOutlined /></a>
              </Space>
            </div>
          </Col>
          <Col xs={12} sm={12} md={5}>
            <h4 className={styles.title}>Thể Loại</h4>
            <ul className={styles.list}>
              {categories.map(cat => (
                <li key={cat}><Link href="/categories" className={styles.link}>{cat}</Link></li>
              ))}
            </ul>
          </Col>
          <Col xs={12} sm={12} md={5}>
            <h4 className={styles.title}>Liên Kết</h4>
            <ul className={styles.list}>
              {links.map(l => (
                <li key={l.label}><a href={l.href} className={styles.link}>{l.label}</a></li>
              ))}
            </ul>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <h4 className={styles.title}>Liên Hệ</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>
                <MailOutlined /> contact@comicverse.com
              </li>
              <li className={styles.contactItem}>
                Hỗ trợ 24/7 qua email
              </li>
            </ul>
          </Col>
        </Row>
        <div className={styles.bottom}>
          <p>© 2026 ComicVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
