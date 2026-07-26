'use client';
import { useState } from 'react';
import { Card, Form, Input, Button, Avatar, Tabs, Tag, message } from 'antd';
import { UserOutlined, MailOutlined, EditOutlined, CrownOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleColor, getRoleText, formatDate } from '@/utils/helpers';
import styles from './page.module.css';
import authorRequestApi from "@/services/authorRequestApi";
export default function ProfilePage() {
  const { user, updateProfile, isLoggedIn } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [requestLoading, setRequestLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Card style={{ maxWidth: 500, margin: '60px auto', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF', fontSize: 16 }}>Vui lòng đăng nhập để xem hồ sơ cá nhân</p>
          </Card>
        </div>
      </div>
    );
  }
  const handleAuthorRequest = async () => {
  try {
    setRequestLoading(true);

    await authorRequestApi.create({
      userId: user.id,
      reason: "Tôi muốn trở thành tác giả để đăng truyện trên ComicWeb",
    });

    message.success("Đã gửi yêu cầu trở thành tác giả!");
  } catch (error) {
    message.error(
      error?.response?.data?.message || "Gửi yêu cầu thất bại"
    );
  } finally {
    setRequestLoading(false);
  }
};
  const handleSave = async (values) => {
    await updateProfile(values);
    setEditing(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Hồ Sơ Cá Nhân</h1>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <Avatar src={user?.avatar} size={80} icon={<UserOutlined />} />
            <div className={styles.profileInfo}>
              <h2 style={{ color: '#fff', margin: '0 0 4px', fontSize: 22 }}>{user?.name || user?.username}</h2>
              <p style={{ color: '#9CA3AF', margin: '0 0 8px' }}>{user?.email}</p>
              <Tag color={getRoleColor(user?.role)}>{getRoleText(user?.role)}</Tag>
            </div>
          </div>
          <Tabs
            items={[
              {
                key: 'info',
                label: 'Thông tin',
                children: (
                  <div style={{ maxWidth: 500 }}>
                    {editing ? (
                      <Form form={form} layout="vertical" onFinish={handleSave}
                        initialValues={{ username: user?.name, email: user?.email }}>
                        <Form.Item name="username" label="Tên hiển thị" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                          <Input size="large" />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                          <Input size="large" />
                        </Form.Item>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
                          <Button onClick={() => setEditing(false)}>Hủy</Button>
                        </div>
                      </Form>
                    ) : (
                      <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Tên hiển thị</span>
                          <span className={styles.infoValue}> {user?.name || user?.username}</span>
                        </div>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Email</span>
                          <span className={styles.infoValue}>{user?.email}</span>
                        </div>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Vai trò</span>
                          <span className={styles.infoValue}><Tag color={getRoleColor(user?.role)}>{getRoleText(user?.role)}</Tag></span>
                        </div>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Ngày tham gia</span>
                          <span className={styles.infoValue}>{formatDate(user?.createdAt)}</span>
                        </div>
                        <Button icon={<EditOutlined />} onClick={() => setEditing(true)} style={{ marginTop: 16 }}>Chỉnh sửa</Button>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: 'security',
                label: 'Bảo mật',
                children: (
                  <div style={{ maxWidth: 500 }}>
                    <Form layout="vertical">
                      <Form.Item label="Mật khẩu hiện tại"><Input.Password size="large" /></Form.Item>
                      <Form.Item label="Mật khẩu mới"><Input.Password size="large" /></Form.Item>
                      <Form.Item label="Xác nhận mật khẩu mới"><Input.Password size="large" /></Form.Item>
                      <Button type="primary">Đổi mật khẩu</Button>
                    </Form>
                  </div>
                ),
              },
              ...(user?.role?.toUpperCase() !== 'ADMIN' && user?.role?.toUpperCase() !== 'AUTHOR' ? [{
                key: 'author',
                label: 'Yêu cầu tác giả',
                children: (
                  <div style={{ maxWidth: 500 }}>
                    <div>
                      <p style={{ color: '#9CA3AF', marginBottom: 16 }}>Trở thành tác giả để đăng truyện trên ComicVerse</p>
                      <Button
                        type="primary"
                        icon={<CrownOutlined />}
                        size="large"
                        loading={requestLoading}
                        onClick={handleAuthorRequest}
                      >
                        Yêu cầu trở thành tác giả
                      </Button>
                    </div>
                  </div>
                ),
              }] : []),
            ]}
          />
        </div>
      </div>
    </div>
  );
}
