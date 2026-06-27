'use client';
import { Empty, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function EmptyState({ message = 'Không có dữ liệu', description, actionText, onAction }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, padding: 40 }}>
      <Empty
        image={<InboxOutlined style={{ fontSize: 64, color: '#2D2D4A' }} />}
        description={
          <div>
            <p style={{ color: '#9CA3AF', fontSize: 16, marginBottom: 4 }}>{message}</p>
            {description && <p style={{ color: '#6B7280', fontSize: 13 }}>{description}</p>}
          </div>
        }
      >
        {actionText && onAction && (
          <Button type="primary" onClick={onAction}>{actionText}</Button>
        )}
      </Empty>
    </div>
  );
}
