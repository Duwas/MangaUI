"use client";

import { useEffect, useState } from "react";
import { Row, Col, Spin, message } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import MangaCard from "@/components/manga/MangaCard";
import EmptyState from "@/components/common/EmptyState";
import favoriteApi from "@/services/favoriteApi";
import mangaApi from "@/services/mangaApi";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./page.module.css";

export default function FavoritePage() {
  const { user, isLoggedIn } = useAuth();

  const [favMangas, setFavMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn || !user?.id) {
        setFavMangas([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const favRes = await favoriteApi.getByUserId(user.id);
        const favorites = favRes.data || [];

        const mangaResults = await Promise.all(
          favorites.map((fav) => mangaApi.getById(fav.mangaId))
        );

        const mangas = mangaResults.map((res) => res.data).filter(Boolean);

        setFavMangas(mangas);
      } catch (error) {
        console.error("Lỗi lấy truyện yêu thích:", error);
        message.error("Không lấy được danh sách yêu thích");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isLoggedIn, user]);

  if (!isLoggedIn) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <HeartOutlined style={{ color: "#EF4444" }} /> Truyện Yêu Thích
          </h1>

          <EmptyState
            message="Bạn chưa đăng nhập"
            description="Vui lòng đăng nhập để xem danh sách truyện yêu thích."
          />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container} style={{ textAlign: "center", padding: "80px 0" }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <HeartOutlined style={{ color: "#EF4444" }} /> Truyện Yêu Thích
        </h1>

        {favMangas.length === 0 ? (
          <EmptyState
            message="Chưa có truyện yêu thích"
            description="Hãy thêm truyện vào danh sách yêu thích để đọc sau!"
          />
        ) : (
          <>
            <p style={{ color: "#9CA3AF", marginBottom: 20 }}>
              Bạn đang có <strong>{favMangas.length}</strong> truyện yêu thích
            </p>

            <Row gutter={[16, 16]}>
              {favMangas.map((manga) => (
                <Col key={manga.id} xs={12} sm={8} md={6} lg={4}>
                  <MangaCard manga={manga} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
}