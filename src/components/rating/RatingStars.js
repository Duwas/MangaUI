'use client';
import { Rate, Space, Typography } from 'antd';
import { formatNumber } from '@/utils/helpers';

const { Text } = Typography;

export default function RatingStars({ rating = 0, ratingCount = 0, interactive = false, onRate }) {
  return (
    <Space size={8} align="center">
      <Rate
        allowHalf
        disabled={!interactive}
        value={rating}
        onChange={onRate}
        style={{ fontSize: 16 }}
      />
      <Text style={{ color: '#F59E0B', fontWeight: 700, fontSize: 15 }}>{rating.toFixed(1)}</Text>
      <Text style={{ color: '#6B7280', fontSize: 12 }}>({formatNumber(ratingCount)} đánh giá)</Text>
    </Space>
  );
}
