'use client';
import { useState } from 'react';
import Link from 'next/link';
import { List, Select, Button, Space } from 'antd';
import { EyeOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { formatNumber, formatDate } from '@/utils/helpers';
import styles from './ChapterList.module.css';

export default function ChapterList({ chapters = [], mangaId }) {
  const [sortOrder, setSortOrder] = useState('desc');
  const sorted = [...chapters].sort((a, b) =>
    sortOrder === 'desc' ? b.chapterNumber - a.chapterNumber : a.chapterNumber - b.chapterNumber
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Danh Sách Chương ({chapters.length})</h3>
        <Button
          icon={sortOrder === 'desc' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
          onClick={() => setSortOrder(s => s === 'desc' ? 'asc' : 'desc')}
          size="small"
        >
          {sortOrder === 'desc' ? 'Mới nhất' : 'Cũ nhất'}
        </Button>
      </div>
      <div className={styles.list}>
        {sorted.map(ch => (
          <Link key={ch.id} href={`/chapter/${ch.id}`} className={styles.item}>
            <span className={styles.chapterNum}>Chapter {ch.chapterNumber}</span>
            <span className={styles.chapterTitle}>{ch.title?.replace(/^Chapter \d+:?\s*/, '') || ''}</span>
            <span className={styles.chapterMeta}>
              <span><EyeOutlined /> {formatNumber(ch.views)}</span>
              <span>{formatDate(ch.createdAt)}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
