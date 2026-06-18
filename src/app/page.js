"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Tag, Spin } from "antd";
import {
  ThunderboltOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import MangaGrid from "@/components/manga/MangaGrid";
import Sidebar from "@/components/layout/Sidebar";
import mangaApi from "@/services/mangaApi";
import styles from "./page.module.css";

export default function HomePage() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await mangaApi.getApproved();
        setMangas(res.data || []);
      } catch (error) {
        console.error("Lỗi lấy danh sách manga:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  const hotManga = mangas.filter((m) => m.hot);
  const newManga = mangas.filter((m) => m.newManga);
  const featuredManga = mangas.filter((m) => m.featured);

  const completedManga = mangas.filter(
    (m) => m.status === "COMPLETED"
  );

  const latestManga = [...mangas]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 10);

  if (loading) {
    return (
      <div className={styles.page}>
        <div
          className={styles.container}
          style={{ textAlign: "center", padding: "80px 0" }}
        >
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <Tag
              color="#1DB954"
              style={{
                fontSize: 13,
                padding: "2px 12px",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              <RocketOutlined /> #1 Nền tảng đọc truyện
            </Tag>

            <h1 className={styles.heroTitle}>
              Khám phá thế giới
              <br />
              <span className={styles.heroHighlight}>
                truyện tranh
              </span>{" "}
              không giới hạn
            </h1>

            <p className={styles.heroDesc}>
              Hàng ngàn bộ truyện Manga, Manhwa, Manhua được cập nhật
              liên tục. Đọc miễn phí, chất lượng cao, trải nghiệm mượt mà.
            </p>

            <div className={styles.heroBtns}>
              <Link href="/manga">
                <Button
                  type="primary"
                  size="large"
                  icon={<ThunderboltOutlined />}
                  style={{
                    height: 48,
                    fontWeight: 600,
                    paddingInline: 28,
                  }}
                >
                  Khám phá ngay
                </Button>
              </Link>

              <Link href="/categories">
                <Button
                  size="large"
                  ghost
                  style={{
                    height: 48,
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#fff",
                  }}
                >
                  Thể loại
                </Button>
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>
                  {mangas.length}+
                </span>
                <span className={styles.statLabel}>Bộ truyện</span>
              </div>

              <div className={styles.stat}>
                <span className={styles.statNum}>
                  {mangas.reduce(
                    (total, manga) => total + (manga.views || 0),
                    0
                  ).toLocaleString("vi-VN")}
                </span>
                <span className={styles.statLabel}>Lượt đọc</span>
              </div>

              <div className={styles.stat}>
                <span className={styles.statNum}>100K+</span>
                <span className={styles.statLabel}>Thành viên</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            {featuredManga.slice(0, 3).map((manga, i) => (
              <Link
                href={`/manga/${manga.id}`}
                key={manga.id}
                className={`${styles.heroCard} ${
                  styles[`heroCard${i + 1}`]
                }`}
              >
                <img src={manga.coverImage} alt={manga.title} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.mainContent}>
          <MangaGrid
            mangas={latestManga}
            title="Mới Cập Nhật"
            showViewAll
            viewAllHref="/manga"
            columns={5}
          />

          <MangaGrid
            mangas={hotManga}
            title="Truyện Hot"
            showViewAll
            viewAllHref="/manga?filter=hot"
            columns={5}
          />

          <MangaGrid
            mangas={featuredManga}
            title="Đề Cử Hôm Nay"
            columns={5}
          />

          <MangaGrid
            mangas={completedManga}
            title="Truyện Hoàn Thành"
            showViewAll
            viewAllHref="/manga?status=completed"
            columns={5}
          />

          {newManga.length > 0 && (
            <MangaGrid
              mangas={newManga}
              title="Truyện Mới"
              showViewAll
              columns={5}
            />
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  );
}