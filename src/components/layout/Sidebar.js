'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Tabs, Avatar } from 'antd';
import { EyeOutlined, TrophyOutlined } from '@ant-design/icons';
import mockManga from '@/data/mockManga';
import { formatNumber } from '@/utils/helpers';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const [tab, setTab] = useState('day');
  const sorted = [...mockManga].sort((a, b) => b.totalViews - a.totalViews).slice(0, 10);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <TrophyOutlined style={{ color: '#F59E0B' }} /> Bảng Xếp Hạng
        </h3>
        <Tabs
          activeKey={tab}
          onChange={setTab}
          size="small"
          items={[
            { key: 'day', label: 'Ngày' },
            { key: 'week', label: 'Tuần' },
            { key: 'month', label: 'Tháng' },
          ]}
        />
        <div className={styles.rankList}>
          {sorted.map((manga, i) => (
            <Link key={manga.id} href={`/manga/${manga.id}`} className={styles.rankItem}>
              <span className={`${styles.rankNum} ${i < 3 ? styles[`top${i + 1}`] : ''}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <img src={manga.coverImage} alt={manga.title} className={styles.rankCover} />
              <div className={styles.rankInfo}>
                <p className={styles.rankTitle}>{manga.title}</p>
                <span className={styles.rankViews}>
                  <EyeOutlined /> {formatNumber(manga.totalViews)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
