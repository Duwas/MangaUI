export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const timeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'Vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} tháng trước`;
  return `${Math.floor(diff / 31536000)} năm trước`;
};

export const getStatusColor = (status) => {
  const colors = { ongoing: 'green', completed: 'blue', hiatus: 'orange' };
  return colors[status] || 'default';
};

export const getStatusText = (status) => {
  const texts = { ongoing: 'Đang tiến hành', completed: 'Hoàn thành', hiatus: 'Tạm ngưng' };
  return texts[status] || status;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateSlug = (text) => {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const getRoleColor = (role) => {
  const colors = { admin: 'red', author: 'gold', user: 'cyan' };
  return colors[role] || 'default';
};

export const getRoleText = (role) => {
  const texts = { admin: 'Quản trị viên', author: 'Tác giả', user: 'Người dùng' };
  return texts[role] || role;
};
