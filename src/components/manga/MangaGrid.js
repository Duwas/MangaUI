'use client';
import Link from 'next/link';
import { Row, Col, Skeleton } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import MangaCard from './MangaCard';
import styles from './MangaGrid.module.css';

export default function MangaGrid({ mangas = [], title, showViewAll = false, viewAllHref = '/manga', loading = false, columns = 5 }) {
  if (loading) {
    return (
      <section className={styles.section}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
          </div>
        )}
        <Row gutter={[16, 16]}>
          {Array.from({ length: columns * 2 }).map((_, i) => (
            <Col key={i} xs={12} sm={8} md={6} lg={Math.floor(24 / columns)}>
              <div className={styles.skeleton}>
                <Skeleton.Image active style={{ width: '100%', height: 0, paddingTop: '140%' }} />
                <Skeleton active paragraph={{ rows: 1 }} title={{ width: '80%' }} style={{ padding: '10px 12px' }} />
              </div>
            </Col>
          ))}
        </Row>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {showViewAll && (
            <Link href={viewAllHref} className={styles.viewAll}>
              Xem tất cả <RightOutlined />
            </Link>
          )}
        </div>
      )}
      <Row gutter={[16, 16]}>
        {mangas.map(manga => (
          <Col key={manga.id} xs={12} sm={8} md={6} lg={Math.floor(24 / columns)}>
            <MangaCard manga={manga} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
