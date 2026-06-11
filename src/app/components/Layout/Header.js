"use client";
import React from 'react';
import { Layout, Menu, Button, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const MangaHeader = ({ onRegisterClick }) => {
  // Định nghĩa các mục menu
  const menuItems = [
    'Sách điện tử', 'Sách hội viên', 'Sách hiệu sồi', 'Sách nói', 
    'Sách mua lẻ', 'Sách ngoại văn', 'Truyện tranh', 'Sách tóm tắt', 
    'Dịch vụ Xuất bản', 'Xem thêm'
  ].map(key => ({ key, label: key }));

  return (
    <Header style={{ background: '#0a0d14', color: '#fff', display: 'flex', alignItems: 'center', height: 'auto', padding: '10px 50px', justifyContent: 'space-between' }}>
      {/* 1. Logo (Trái) */}
      <Flex align="center" gap="middle">
        <div style={{ color: '#00bd9c', fontSize: '24px', fontWeight: 'bold' }}>WAKA</div>
        {/* 2. Menu Điều hướng (Giữa) */}
        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['Truyện tranh']} 
          items={menuItems} 
          style={{ background: 'transparent', flex: 1, minWidth: 0, borderBottom: 'none' }}
        />
      </Flex>
      
      {/* 3. Phía bên phải (Tìm kiếm, Gói cước, Nút) */}
      <Flex align="center" gap="small">
        <Button type="text" icon={<SearchOutlined />} style={{ color: '#fff' }} />
        <Button style={{ color: '#00bd9c', backgroundColor: '#fff', borderColor: '#00bd9c', borderRadius: '20px' }}>Gói cước</Button>
        {/* Nút Đăng ký sẽ gọi hàm onRegisterClick khi được bấm */}
        <Button type="text" style={{ color: '#fff' }} onClick={onRegisterClick}>Đăng ký</Button>
        <Button style={{ backgroundColor: '#00bd9c', borderColor: '#00bd9c', color: '#fff', borderRadius: '20px' }}>Đăng nhập</Button>
      </Flex>
    </Header>
  );
};

export default MangaHeader;