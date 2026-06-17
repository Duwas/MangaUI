'use client';
import Link from 'next/link';
import { Tag, Rate } from 'antd';
import { EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { formatNumber, timeAgo, getStatusText } from '@/utils/helpers';
import mockCategories from '@/data/mockCategories';
import styles from './MangaCard.module.css';

export default function MangaCard({ manga }) {
  const cats = mockCategories.filter(c => manga.categories?.includes(c.id)).slice(0, 2);

  return (
    <Link href={`/manga/${manga.id}`} className={styles.card}>
      <div className={styles.coverWrap}>
        <img src={manga.coverImage} alt={manga.title} className={styles.cover} loading="lazy" />
        <div className={styles.overlay}>
          <p className={styles.desc}>{manga.description?.substring(0, 80)}...</p>
        </div>
        <div className={styles.badges}>
          {manga.isHot && <span className={styles.hot}>HOT</span>}
          {manga.isNew && <span className={styles.new}>NEW</span>}
          {manga.status === 'completed' && <span className={styles.completed}>END</span>}
        </div>
        <div className={styles.chapter}>
          Chap {manga.latestChapter}
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{manga.title}</h3>
        <div className={styles.meta}>
          <span className={styles.views}><EyeOutlined /> {formatNumber(manga.totalViews)}</span>
          <span className={styles.time}><ClockCircleOutlined /> {timeAgo(manga.updatedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
