'use client';
import { Table, Button, Tag, Space, Popconfirm, Input, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { getStatusColor, getStatusText, formatNumber } from '@/utils/helpers';

export default function MangaTable({ mangas = [], onEdit, onDelete, onAdd, loading = false }) {
  const columns = [
    {
      title: 'Truyện', dataIndex: 'title', key: 'title',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={record.coverImage} alt={text} style={{ width: 40, height: 56, borderRadius: 4, objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 600, color: '#fff' }}>{text}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>{record.author}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 120,
      render: (s) => <Tag color={getStatusColor(s)}>{getStatusText(s)}</Tag>,
    },
    { title: 'Chương', dataIndex: 'totalChapters', key: 'chapters', width: 80, render: (v) => v },
    { title: 'Lượt xem', dataIndex: 'totalViews', key: 'views', width: 100, render: (v) => formatNumber(v) },
    { title: 'Đánh giá', dataIndex: 'rating', key: 'rating', width: 80, render: (v) => <span style={{ color: '#F59E0B' }}>⭐ {v}</span> },
    {
      title: 'Hành động', key: 'action', width: 120,
      render: (_, record) => (
        <Space size={4}>
          <Button type="text" icon={<EditOutlined />} onClick={() => onEdit?.(record)} style={{ color: '#3B82F6' }} />
          <Popconfirm title="Xóa truyện này?" onConfirm={() => onDelete?.(record.id)} okText="Xóa" cancelText="Hủy">
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <Input.Search placeholder="Tìm kiếm truyện..." style={{ maxWidth: 320 }} allowClear />
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>Thêm truyện</Button>
      </div>
      <Table
        columns={columns}
        dataSource={mangas}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 700 }}
      />
    </div>
  );
}
