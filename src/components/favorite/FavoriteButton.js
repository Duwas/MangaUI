'use client';
import { useState } from 'react';
import { Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { isFavorited as checkFav } from '@/data/mockFavorites';
import styles from './FavoriteButton.module.css';

export default function FavoriteButton({ mangaId, size = 'large' }) {
  const [fav, setFav] = useState(checkFav(3, mangaId)); // userId 3 = currentUser

  return (
    <Button
      size={size}
      icon={fav ? <HeartFilled /> : <HeartOutlined />}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFav(!fav); }}
      className={`${styles.btn} ${fav ? styles.active : ''}`}
    >
      {fav ? 'Đã Thích' : 'Yêu Thích'}
    </Button>
  );
}
