'use client';

import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Tag, Input, Spin } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import Link from 'next/link';
import mockCategories from '@/data/mockCategories';
import mangaApi from '@/services/mangaApi';
import styles from './page.module.css';

export default function CategoriesPage() {
  const [search, setSearch] = useState('');
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await mangaApi.getApproved();
        setMangas(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  const filtered = useMemo(() => {
    return mockCategories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const getCount = (category) => {
    return mangas.filter((manga) =>
      manga.categories?.some((c) => c.name === category.name)
    ).length;
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div
          className={styles.container}
          style={{ textAlign: 'center', padding: '80px 0' }}
        >
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <AppstoreOutlined /> Thể Loại Truyện
        </h1>

        <Input.Search
          placeholder="Tìm thể loại..."
          allowClear
          style={{ maxWidth: 360, marginBottom: 24 }}
          size="large"
          onSearch={setSearch}
          onChange={(e) => !e.target.value && setSearch('')}
        />

        <Row gutter={[16, 16]}>
          {filtered.map((cat) => (
            <Col key={cat.id} xs={12} sm={8} md={6} lg={4}>
              <Link
                href={`/manga?category=${cat.id}`}
                className={styles.card}
              >
                <div className={styles.cardIcon}>
                  <AppstoreOutlined />
                </div>

                <h3 className={styles.cardName}>{cat.name}</h3>

                <p className={styles.cardDesc}>{cat.description}</p>

                <Tag color="green" className={styles.cardCount}>
                  {getCount(cat) || cat.mangaCount} truyện
                </Tag>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}