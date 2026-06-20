'use client';
import { Result, Button } from 'antd';

export default function ErrorState({ message = 'Đã xảy ra lỗi', onRetry }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, padding: 40 }}>
      <Result
        status="error"
        title="Oops!"
        subTitle={<span style={{ color: '#9CA3AF' }}>{message}</span>}
        extra={onRetry && <Button type="primary" onClick={onRetry}>Thử lại</Button>}
      />
    </div>
  );
}
