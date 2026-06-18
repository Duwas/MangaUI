"use client";

import Link from "next/link";
import { EyeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { formatNumber, timeAgo } from "@/utils/helpers";
import styles from "./MangaCard.module.css";

export default function MangaCard({ manga }) {
  return (
    <Link href={`/manga/${manga.id}`} className={styles.card}>
      <div className={styles.coverWrap}>
        <img
          src={manga.coverImage}
          alt={manga.title}
          className={styles.cover}
          loading="lazy"
        />

        <div className={styles.overlay}>
          <p className={styles.desc}>
            {manga.description?.substring(0, 80)}...
          </p>
        </div>

        <div className={styles.badges}>
          {manga.hot && <span className={styles.hot}>HOT</span>}
          {manga.newManga && <span className={styles.new}>NEW</span>}
          {manga.status === "COMPLETED" && (
            <span className={styles.completed}>END</span>
          )}
        </div>

        <div className={styles.chapter}>
          Chap {manga.chapterCount || 0}
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{manga.title}</h3>

        <div className={styles.meta}>
          <span className={styles.views}>
            <EyeOutlined /> {formatNumber(manga.views || 0)}
          </span>

          <span className={styles.time}>
            <ClockCircleOutlined /> {timeAgo(manga.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}