"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tabs } from "antd";
import { EyeOutlined, TrophyOutlined } from "@ant-design/icons";
import mangaApi from "@/services/mangaApi";
import { formatNumber } from "@/utils/helpers";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [tab, setTab] = useState("day");
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await mangaApi.getApproved();

        setMangas(res.data || []);
      } catch (error) {
        console.error("Lỗi lấy bảng xếp hạng:", error);
      }
    };

    fetchMangas();
  }, []);

  const sorted = [...mangas]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <TrophyOutlined style={{ color: "#F59E0B" }} /> Bảng Xếp Hạng
        </h3>

        <Tabs
          activeKey={tab}
          onChange={setTab}
          size="small"
          items={[
            { key: "day", label: "Ngày" },
            { key: "week", label: "Tuần" },
            { key: "month", label: "Tháng" },
          ]}
        />

        <div className={styles.rankList}>
          {sorted.map((manga, i) => (
            <Link
              key={manga.id}
              href={`/manga/${manga.id}`}
              className={styles.rankItem}
            >
              <span
                className={`${styles.rankNum} ${
                  i < 3 ? styles[`top${i + 1}`] : ""
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <img
                src={manga.coverImage}
                alt={manga.title}
                className={styles.rankCover}
              />

              <div className={styles.rankInfo}>
                <p className={styles.rankTitle}>{manga.title}</p>

                <span className={styles.rankViews}>
                  <EyeOutlined /> {formatNumber(manga.views || 0)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}