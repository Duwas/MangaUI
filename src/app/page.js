'use client';
import Link from 'next/link';
import { Button, Tag } from 'antd';
import { FireOutlined, ThunderboltOutlined, StarOutlined, CheckCircleOutlined, RocketOutlined } from '@ant-design/icons';
import MangaGrid from '@/components/manga/MangaGrid';
import Sidebar from '@/components/layout/Sidebar';
import mockManga from '@/data/mockManga';
import styles from './page.module.css';

export default function HomePage() {
  const hotManga = mockManga.filter(m => m.isHot);
  const newManga = mockManga.filter(m => m.isNew);
  const featuredManga = mockManga.filter(m => m.isFeatured);
  const completedManga = mockManga.filter(m => m.status === 'completed');
  const latestManga = [...mockManga].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 10);

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <Tag color="#1DB954" style={{ fontSize: 13, padding: '2px 12px', fontWeight: 600, marginBottom: 12 }}>
              <RocketOutlined /> #1 Nền tảng đọc truyện
            </Tag>
            <h1 className={styles.heroTitle}>
              Khám phá thế giới<br />
              <span className={styles.heroHighlight}>truyện tranh</span> không giới hạn
            </h1>
            <p className={styles.heroDesc}>
              Hàng ngàn bộ truyện Manga, Manhwa, Manhua được cập nhật liên tục. 
              Đọc miễn phí, chất lượng cao, trải nghiệm mượt mà.
            </p>
            <div className={styles.heroBtns}>
              <Link href="/manga">
                <Button type="primary" size="large" icon={<ThunderboltOutlined />} style={{ height: 48, fontWeight: 600, paddingInline: 28 }}>
                  Khám phá ngay
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="large" ghost style={{ height: 48, borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                  Thể loại
                </Button>
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}><span className={styles.statNum}>10K+</span><span className={styles.statLabel}>Bộ truyện</span></div>
              <div className={styles.stat}><span className={styles.statNum}>50M+</span><span className={styles.statLabel}>Lượt đọc</span></div>
              <div className={styles.stat}><span className={styles.statNum}>100K+</span><span className={styles.statLabel}>Thành viên</span></div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            {featuredManga.slice(0, 3).map((manga, i) => (
              <Link href={`/manga/${manga.id}`} key={manga.id} className={`${styles.heroCard} ${styles[`heroCard${i + 1}`]}`}>
                <img src={manga.coverImage} alt={manga.title} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className={styles.mainLayout}>
        <div className={styles.mainContent}>
          <MangaGrid mangas={latestManga} title="Mới Cập Nhật" showViewAll viewAllHref="/manga" columns={5} />
          <MangaGrid mangas={hotManga} title="Truyện Hot" showViewAll viewAllHref="/manga?filter=hot" columns={5} />
          <MangaGrid mangas={featuredManga} title="Đề Cử Hôm Nay" columns={5} />
          <MangaGrid mangas={completedManga} title="Truyện Hoàn Thành" showViewAll viewAllHref="/manga?status=completed" columns={5} />
          {newManga.length > 0 && (
            <MangaGrid mangas={newManga} title="Truyện Mới" showViewAll columns={5} />
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
