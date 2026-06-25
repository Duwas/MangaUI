'use client';
import { Table, Button, Tag, Avatar, Space, Popconfirm, Input, Select } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { getRoleColor, getRoleText, formatDate } from '@/utils/helpers';

export default function UserTable({ users = [], onToggleActive, onChangeRole, loading = false }) {
  const columns = [
    {
      title: 'Người dùng', dataIndex: 'username', key: 'username',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar src={record.avatar} size={36} />
          <div>
            <div style={{ fontWeight: 600, color: '#fff' }}>{text}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Vai trò', dataIndex: 'role', key: 'role', width: 140,
      render: (role, record) => (
        <Select value={role} size="small" style={{ width: 130 }}
          onChange={(v) => onChangeRole?.(record.id, v)}
          options={[
            { value: 'user', label: 'Người dùng' },
            { value: 'author', label: 'Tác giả' },
            { value: 'admin', label: 'Quản trị viên' },
          ]}
        />
      ),
    },
    { title: 'Ngày tham gia', dataIndex: 'createdAt', key: 'createdAt', width: 120, render: (v) => formatDate(v) },
    {
      title: 'Trạng thái', dataIndex: 'isActive', key: 'isActive', width: 100,
      render: (active) => <Tag color={active ? 'green' : 'red'}>{active ? 'Hoạt động' : 'Bị khóa'}</Tag>,
    },
    {
      title: 'Hành động', key: 'action', width: 100,
      render: (_, record) => (
        <Popconfirm title={record.isActive ? 'Khóa tài khoản này?' : 'Mở khóa tài khoản?'}
          onConfirm={() => onToggleActive?.(record.id)} okText="Xác nhận" cancelText="Hủy">
          <Button type="text" icon={record.isActive ? <LockOutlined /> : <UnlockOutlined />}
            style={{ color: record.isActive ? '#EF4444' : '#1DB954' }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Tìm kiếm người dùng..." style={{ maxWidth: 320 }} allowClear />
      </div>
      <Table columns={columns} dataSource={users} rowKey="id" loading={loading}
        pagination={{ pageSize: 10 }} scroll={{ x: 600 }} />
    </div>
  );
}
