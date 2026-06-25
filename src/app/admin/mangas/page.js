"use client";

import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import AdminLayout from "@/components/admin/AdminLayout";
import MangaTable from "@/components/admin/MangaTable";
import mangaApi from "@/services/mangaApi";

export default function AdminMangasPage() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMangas = async () => {
    try {
      setLoading(true);
      const res = await mangaApi.getAll();
      setMangas(res.data || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách truyện:", error);
      message.error("Không lấy được danh sách truyện");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await mangaApi.delete(id);
      message.success("Đã xóa truyện!");
      fetchMangas();
    } catch (error) {
      console.error("Lỗi xóa truyện:", error);
      message.error(error?.response?.data?.message || "Xóa truyện thất bại");
    }
  };

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
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Quản Lý Truyện
      </h1>

      <MangaTable
        mangas={mangas}
        onEdit={(m) => message.info(`Chỉnh sửa: ${m.title}`)}
        onDelete={handleDelete}
        onAdd={() => message.info("Mở form thêm truyện")}
      />
    </AdminLayout>
  );
}