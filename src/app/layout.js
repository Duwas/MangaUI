import { Inter } from 'next/font/google';
import './globals.css';
import AntdProvider from './AntdProvider';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata = {
  title: 'ComicVerse - Đọc Truyện Tranh Online',
  description: 'Nền tảng đọc truyện tranh trực tuyến hàng đầu. Manga, Manhwa, Manhua cập nhật liên tục mỗi ngày.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
