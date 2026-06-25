'use client';
import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/admin/AdminLayout';
import mockCategories from '@/data/mockCategories';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Tên thể loại', dataIndex: 'name', key: 'name', render: t => <span style={{ fontWeight: 600, color: '#fff' }}>{t}</span> },
    { title: 'Slug', dataIndex: 'slug', key: 'slug', render: s => <Tag>{s}</Tag> },
    { title: 'Số truyện', dataIndex: 'mangaCount', key: 'count', width: 100 },
    {
      title: 'Hành động', key: 'action', width: 120,
      render: (_, rec) => (
        <span style={{ display: 'flex', gap: 4 }}>
          <Button type="text" icon={<EditOutlined />} style={{ color: '#3B82F6' }} />
          <Popconfirm title="Xóa thể loại?" onConfirm={() => { setCategories(prev => prev.filter(c => c.id !== rec.id)); message.success('Đã xóa!'); }}>
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>Quản Lý Thể Loại</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>Thêm thể loại</Button>
      </div>
      <Table columns={columns} dataSource={categories} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title="Thêm thể loại" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={(v) => { message.success('Đã thêm!'); setModalOpen(false); }}>
          <Form.Item name="name" label="Tên thể loại" rules={[{ required: true }]}><Input size="large" /></Form.Item>
          <Form.Item name="description" label="Mô tả"><Input.TextArea rows={3} /></Form.Item>
          <Button type="primary" htmlType="submit" block>Thêm</Button>
        </Form>
      </Modal>
    </AdminLayout>
  );
}
