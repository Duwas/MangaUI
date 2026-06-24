'use client';
import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import mockChapters from '@/data/mockChapters';
import { formatDate, formatNumber } from '@/utils/helpers';

export default function AuthorChaptersPage() {
  const [chapters] = useState(mockChapters.slice(0, 10));
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: 'Chapter', dataIndex: 'chapterNumber', key: 'num', width: 80, render: v => <span style={{ fontWeight: 600, color: '#1DB954' }}>Ch. {v}</span> },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', render: t => <span style={{ color: '#fff' }}>{t}</span> },
    { title: 'Lượt xem', dataIndex: 'views', key: 'views', width: 100, render: v => formatNumber(v) },
    { title: 'Ngày đăng', dataIndex: 'createdAt', key: 'date', width: 120, render: v => formatDate(v) },
    {
      title: 'Hành động', key: 'action', width: 100,
      render: () => <Button type="text" icon={<DeleteOutlined />} danger />,
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>Quản Lý Chương</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>Thêm chương mới</Button>
      </div>
      <Table columns={columns} dataSource={chapters} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title="Thêm chương mới" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} width={600}>
        <Form form={form} layout="vertical" onFinish={() => { message.success('Đã thêm chương!'); setModalOpen(false); }}>
          <Form.Item name="chapterNumber" label="Số chương" rules={[{ required: true }]}><Input type="number" size="large" /></Form.Item>
          <Form.Item name="title" label="Tiêu đề chương"><Input size="large" /></Form.Item>
          <Form.Item name="images" label="Upload ảnh">
            <Upload listType="picture-card"><div><UploadOutlined /><div style={{ marginTop: 8 }}>Upload</div></div></Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">Đăng chương</Button>
        </Form>
      </Modal>
    </div>
  );
}
