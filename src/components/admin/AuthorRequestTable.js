'use client';
import { Table, Button, Tag, Space, Popconfirm } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { formatDate } from '@/utils/helpers';

export default function AuthorRequestTable({ requests = [], onApprove, onReject, loading = false }) {
  const columns = [
    {
      title: 'Người yêu cầu', dataIndex: 'userName', key: 'userName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#fff' }}>{text}</div>
          <div style={{ fontSize: 12, color: '#9CA3AF' }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Ngày yêu cầu', dataIndex: 'createdAt', key: 'createdAt', width: 130,
      render: (v) => formatDate(v),
    },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 120,
      render: (s) => {
        const statusKey = s ? s.toLowerCase() : '';
        const colors = { pending: 'orange', approved: 'green', rejected: 'red' };
        const texts = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' };
        return <Tag color={colors[statusKey] || 'default'}>{texts[statusKey] || s}</Tag>;
      },
    },
    {
      title: 'Hành động', key: 'action', width: 160,
      render: (_, record) => record.status?.toUpperCase() === 'PENDING' ? (
        <Space size={4}>
          <Popconfirm title="Duyệt yêu cầu này?" onConfirm={() => onApprove?.(record.id)} okText="Duyệt" cancelText="Hủy">
            <Button type="primary" size="small" icon={<CheckOutlined />}>Duyệt</Button>
          </Popconfirm>
          <Popconfirm title="Từ chối yêu cầu?" onConfirm={() => onReject?.(record.id)} okText="Từ chối" cancelText="Hủy">
            <Button size="small" danger icon={<CloseOutlined />}>Từ chối</Button>
          </Popconfirm>
        </Space>
      ) : <span style={{ color: '#6B7280', fontSize: 13 }}>—</span>,
    },
  ];

  return (
    <Table columns={columns} dataSource={requests} rowKey="id" loading={loading}
      pagination={{ pageSize: 10 }} scroll={{ x: 500 }} />
  );
}
