"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Button, Spin } from "antd";
import {
  BookOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import mangaApi from "@/services/mangaApi";
import { formatNumber } from "@/utils/helpers";

export default function AuthorDashboard() {
  const [myMangas, setMyMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await mangaApi.getAll();
        setMyMangas(res.data || []);
      } catch (error) {
        console.error("Lỗi lấy truyện tác giả:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  const totalViews = myMangas.reduce((sum, m) => sum + (m.views || 0), 0);
  const totalChapters = myMangas.reduce(
    (sum, m) => sum + (m.chapterCount || 0),
    0
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: 0 }}>
          Kênh Tác Giả
        </h1>

        <Link href="/author/mangas">
          <Button type="primary" icon={<PlusOutlined />}>
            Quản lý truyện
          </Button>
        </Link>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={8}>
          <Card style={{ background: "#1A1A2E", borderColor: "#2D2D4A" }}>
            <Statistic
              title={<span style={{ color: "#9CA3AF" }}>Tổng truyện</span>}
              value={myMangas.length}
              prefix={<BookOutlined style={{ color: "#1DB954" }} />}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card style={{ background: "#1A1A2E", borderColor: "#2D2D4A" }}>
            <Statistic
              title={<span style={{ color: "#9CA3AF" }}>Tổng chương</span>}
              value={totalChapters}
              prefix={<FileTextOutlined style={{ color: "#3B82F6" }} />}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card style={{ background: "#1A1A2E", borderColor: "#2D2D4A" }}>
            <Statistic
              title={<span style={{ color: "#9CA3AF" }}>Tổng lượt xem</span>}
              value={formatNumber(totalViews)}
              prefix={<EyeOutlined style={{ color: "#F59E0B" }} />}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={<span style={{ color: "#fff" }}>Truyện của tôi</span>}
        style={{ background: "#1A1A2E", borderColor: "#2D2D4A" }}
        extra={
          <Link href="/author/mangas" style={{ color: "#1DB954" }}>
            Xem tất cả
          </Link>
        }
      >
        {myMangas.slice(0, 5).map((m) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: "1px solid #2D2D4A",
            }}
          >
            <img
              src={m.coverImage}
              alt={m.title}
              style={{
                width: 40,
                height: 56,
                borderRadius: 4,
                objectFit: "cover",
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#fff" }}>{m.title}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                {m.chapterCount || 0} chương · {formatNumber(m.views || 0)} views
              </div>
            </div>

            <Link href="/author/chapters">
              <Button size="small" icon={<PlusOutlined />}>
                Thêm chương
              </Button>
            </Link>
          </div>
        ))}
      </Card>
    </div>
  );
}