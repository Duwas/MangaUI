"use client";

import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import AdminLayout from "@/components/admin/AdminLayout";
import UserTable from "@/components/admin/UserTable";
import authApi from "@/services/authApi";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await authApi.getAllUsers();
      setUsers(res.data || []);
    } catch (error) {
      console.error(error);
      message.error("Không lấy được danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleActive = async (id) => {
    try {
      message.success("Đã cập nhật trạng thái!");
      fetchUsers();
    } catch (error) {
      message.error("Cập nhật thất bại");
    }
  };

  const handleChangeRole = async (id, role) => {
  try {
    await authApi.changeRole(id, role);

    message.success("Đổi vai trò thành công");
    fetchUsers();
  } catch (error) {
    message.error(
      error?.response?.data?.message || "Đổi vai trò thất bại"
    );
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
        Quản Lý Người Dùng
      </h1>

      <UserTable
        users={users}
        onToggleActive={handleToggleActive}
        onChangeRole={handleChangeRole}
      />
    </AdminLayout>
  );
}