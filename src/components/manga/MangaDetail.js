"use client";

import Link from "next/link";
import { Row, Col, Tag, Button, Typography, Space } from "antd";
import {
  EyeOutlined,
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import {
  formatNumber,
  timeAgo,
  getStatusColor,
  getStatusText,
} from "@/utils/helpers";
import FavoriteButton from "@/components/favorite/FavoriteButton";
import RatingStars from "@/components/rating/RatingStars";
import styles from "./MangaDetail.module.css";

const { Title, Paragraph } = Typography;

export default function MangaDetail({ manga, firstChapterId, latestChapterId }) {
  const categories = manga.categories || [];

  return (
    <div className={styles.detail}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${manga.bannerImage})` }}
      >
        <div className={styles.bannerOverlay} />
      </div>

      <div className={styles.content}>
        <Row gutter={[32, 24]}>
          <Col xs={24} sm={8} md={6}>
            <div className={styles.coverWrap}>
              <img
                src={manga.coverImage}
                alt={manga.title}
                className={styles.cover}
              />

              <Tag
                color={getStatusColor(manga.status)}
                className={styles.statusTag}
              >
                {getStatusText(manga.status)}
              </Tag>
            </div>
          </Col>

          <Col xs={24} sm={16} md={18}>
            <div className={styles.info}>
              <Title level={2} className={styles.title}>
                {manga.title}
              </Title>

              <div className={styles.metaRow}>
                <Space size={16} wrap>
                  <span className={styles.metaItem}>
                    <UserOutlined /> {manga.author || "Đang cập nhật"}
                  </span>

                  <span className={styles.metaItem}>
                    <BookOutlined /> {manga.chapterCount || 0} chương
                  </span>

                  <span className={styles.metaItem}>
                    <EyeOutlined /> {formatNumber(manga.views || 0)} lượt xem
                  </span>

                  <span className={styles.metaItem}>
                    <CalendarOutlined /> {timeAgo(manga.updatedAt || manga.createdAt)}
                  </span>
                </Space>
              </div>

              <RatingStars
                rating={manga.averageRating || 0}
                ratingCount={manga.ratingCount || 0}
              />

              <div className={styles.categories}>
                {categories.map((c, index) => (
                  <Tag key={index} className={styles.catTag}>
                    {typeof c === "string" ? c : c?.name}
                  </Tag>
                ))}
              </div>

              <Paragraph className={styles.desc}>{manga.description}</Paragraph>

              <div className={styles.actions}>
                {firstChapterId ? (
                  <Link href={`/chapter/${firstChapterId}`}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<ReadOutlined />}
                      className={styles.readBtn}
                    >
                      Đọc Từ Đầu
                    </Button>
                  </Link>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    icon={<ReadOutlined />}
                    className={styles.readBtn}
                    disabled
                  >
                    Đọc Từ Đầu
                  </Button>
                )}

                {latestChapterId ? (
                  <Link href={`/chapter/${latestChapterId}`}>
                    <Button size="large" icon={<BookOutlined />}>
                      Đọc Mới Nhất
                    </Button>
                  </Link>
                ) : (
                  <Button size="large" icon={<BookOutlined />} disabled>
                    Chưa có chapter
                  </Button>
                )}

                <FavoriteButton mangaId={manga.id} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}