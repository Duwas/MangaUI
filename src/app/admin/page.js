"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Spin } from "antd";
import {
  BookOutlined,
  UserOutlined,
  EyeOutlined,
  SolutionOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import AdminLayout from "@/components/admin/AdminLayout";
import mangaApi from "@/services/mangaApi";
import authApi from "@/services/authApi";
import { formatNumber } from "@/utils/helpers";

export default function AdminDashboard() {
  const [mangas, setMangas] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [mangaRes, userRes] = await Promise.all([
          mangaApi.getAll(),
          authApi.getAllUsers(),
        ]);

        setMangas(mangaRes.data || []);
        setUsers(userRes.data || []);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const totalViews = mangas.reduce((sum, m) => sum + (m.views || 0), 0);

  const pendingRequests = users.filter(
    (u) => u.authorRequest?.status === "pending"
  ).length;

  const stats = [
    {
      title: "Tổng Truyện",
      value: mangas.length,
      icon: <BookOutlined />,
      color: "#1DB954",
      suffix: "truyện",
    },
    {
      title: "Người Dùng",
      value: users.length,
      icon: <UserOutlined />,
      color: "#3B82F6",
      suffix: "người",
    },
    {
      title: "Tổng Lượt Xem",
      value: formatNumber(totalViews),
      icon: <EyeOutlined />,
      color: "#F59E0B",
    },
    {
      title: "Chờ Duyệt",
      value: pendingRequests,
      icon: <SolutionOutlined />,
      color: "#EF4444",
      suffix: "yêu cầu",
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1
        style={{
          color: "#fff",
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Dashboard
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <Col key={i} xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{
                background: "#1A1A2E",
                borderColor: "#2D2D4A",
                borderRadius: 12,
              }}
            >
              <Statistic
                title={
                  <span style={{ color: "#9CA3AF", fontSize: 13 }}>
                    {stat.title}
                  </span>
                }
                value={stat.value}
                suffix={stat.suffix}
                prefix={
                  <span
                    style={{
                      color: stat.color,
                      fontSize: 20,
                      marginRight: 8,
                    }}
                  >
                    {stat.icon}
                  </span>
                }
                valueStyle={{
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 700,
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={<span style={{ color: "#fff" }}>Truyện Mới Nhất</span>}
            style={{
              background: "#1A1A2E",
              borderColor: "#2D2D4A",
              borderRadius: 12,
            }}
          >
            {[...mangas]
              .sort(
                (a, b) =>
                  new Date(b.createdAt || b.updatedAt) -
                  new Date(a.createdAt || a.updatedAt)
              )
              .slice(0, 5)
              .map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom: "1px solid #2D2D4A",
                  }}
                >
                  <img
                    src={m.coverImage}
                    alt=""
                    style={{
                      width: 32,
                      height: 44,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 500,
                        color: "#fff",
                        fontSize: 13,
                      }}
                    >
                      {m.title}
                    </div>

                    <div style={{ fontSize: 11, color: "#6B7280" }}>
                      {formatNumber(m.views || 0)} views
                    </div>
                  </div>

                  <span style={{ color: "#1DB954", fontSize: 12 }}>
                    <RiseOutlined />
                  </span>
                </div>
              ))}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={<span style={{ color: "#fff" }}>Người Dùng Mới</span>}
            style={{
              background: "#1A1A2E",
              borderColor: "#2D2D4A",
              borderRadius: 12,
            }}
          >
            {[...users].slice(0, 5).map((u) => (
              <div
                key={u.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid #2D2D4A",
                }}
              >
                <img
                  src={
                    u.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      u.name || u.email || "User"
                    )}`
                  }
                  alt=""
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 500,
                      color: "#fff",
                      fontSize: 13,
                    }}
                  >
                    {u.name || "Người dùng"}
                  </div>

                  <div style={{ fontSize: 11, color: "#6B7280" }}>
                    {u.email}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
}