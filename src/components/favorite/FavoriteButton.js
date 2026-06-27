"use client";

import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import favoriteApi from "@/services/favoriteApi";
import styles from "./FavoriteButton.module.css";

export default function FavoriteButton({ mangaId, size = "large" }) {
  const { user, isLoggedIn } = useAuth();

  const [fav, setFav] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadFavorite = async () => {
      try {
        const res = await favoriteApi.getByUserId(user.id);

        const favorite = (res.data || []).find(
          (f) => f.mangaId === mangaId || f.manga?.id === mangaId
        );

        if (favorite) {
          setFav(true);
          setFavoriteId(favorite.id);
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadFavorite();
  }, [isLoggedIn, mangaId, user]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      message.warning("Vui lòng đăng nhập để thêm vào yêu thích.");
      return;
    }

    try {
      setLoading(true);

      if (fav) {
        await favoriteApi.delete(favoriteId);

        setFav(false);
        setFavoriteId(null);

        message.success("Đã xóa khỏi yêu thích");
      } else {
        const res = await favoriteApi.add({
          userId: user.id,
          mangaId,
        });

        setFav(true);

        if (res.data?.id) {
          setFavoriteId(res.data.id);
        }

        message.success("Đã thêm vào yêu thích");
      }
    } catch (error) {
      console.error(error);

      message.error(
        error?.response?.data?.message || "Thao tác thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      size={size}
      icon={fav ? <HeartFilled /> : <HeartOutlined />}
      onClick={handleFavorite}
      className={`${styles.btn} ${fav ? styles.active : ""}`}
    >
      {fav ? "Đã Thích" : "Yêu Thích"}
    </Button>
  );
}