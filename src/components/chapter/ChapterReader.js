"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Select } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import styles from "./ChapterReader.module.css";

export default function ChapterReader({ chapter, chapters = [], manga }) {
  const [showNav, setShowNav] = useState(true);

  const currentIdx = chapters.findIndex((c) => c.id === chapter.id);
  const prevChapter =
    currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null;
  const nextChapter = currentIdx > 0 ? chapters[currentIdx - 1] : null;

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && prevChapter) {
        window.location.href = `/chapter/${prevChapter.id}`;
      }

      if (e.key === "ArrowRight" && nextChapter) {
        window.location.href = `/chapter/${nextChapter.id}`;
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [prevChapter, nextChapter]);

  return (
    <div className={styles.reader}>
      <div className={`${styles.topBar} ${showNav ? "" : styles.hidden}`}>
        <div className={styles.topBarInner}>
          <Link href={`/manga/${manga?.id || ""}`} className={styles.backLink}>
            <LeftOutlined /> {manga?.title || "Quay lại"}
          </Link>

          <Select
            value={chapter.id}
            onChange={(v) => (window.location.href = `/chapter/${v}`)}
            className={styles.chapterSelect}
            popupMatchSelectWidth={false}
            options={chapters.map((c) => ({
              value: c.id,
              label: `Chapter ${c.chapterNumber}`,
            }))}
          />

          <div className={styles.navBtns}>
            <Button
              disabled={!prevChapter}
              onClick={() =>
                (window.location.href = `/chapter/${prevChapter?.id}`)
              }
              icon={<LeftOutlined />}
            >
              Trước
            </Button>

            <Button
              disabled={!nextChapter}
              onClick={() =>
                (window.location.href = `/chapter/${nextChapter?.id}`)
              }
            >
              Sau <RightOutlined />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.images} onClick={() => setShowNav((s) => !s)}>
        {chapter.contentImages?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Trang ${i + 1}`}
            className={styles.page}
            loading="lazy"
          />
        ))}
      </div>

      <div className={styles.bottomNav}>
        <Button
          disabled={!prevChapter}
          type="primary"
          ghost
          size="large"
          onClick={() =>
            (window.location.href = `/chapter/${prevChapter?.id}`)
          }
          icon={<LeftOutlined />}
          style={{ flex: 1 }}
        >
          Chương trước
        </Button>

        <Button
          type="primary"
          ghost
          size="large"
          onClick={scrollToTop}
          icon={<VerticalAlignTopOutlined />}
        />

        <Button
          disabled={!nextChapter}
          type="primary"
          size="large"
          onClick={() =>
            (window.location.href = `/chapter/${nextChapter?.id}`)
          }
          style={{ flex: 1 }}
        >
          Chương sau <RightOutlined />
        </Button>
      </div>

      <div className={styles.hint}>
        Dùng phím ← → để chuyển chương | Click vào ảnh để ẩn/hiện thanh điều
        hướng
      </div>
    </div>
  );
}