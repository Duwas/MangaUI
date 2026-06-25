"use client";

import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import AdminLayout from "@/components/admin/AdminLayout";
import AuthorRequestTable from "@/components/admin/AuthorRequestTable";
import authorRequestApi from "@/services/authorRequestApi";

export default function AdminAuthorRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await authorRequestApi.getAll();
      setRequests(res.data || []);
    } catch (error) {
      console.error("Lỗi lấy yêu cầu tác giả:", error);
      message.error("Không lấy được danh sách yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await authorRequestApi.approve(id);
      message.success("Đã duyệt yêu cầu!");
      fetchRequests();
    } catch (error) {
      message.error(error?.response?.data?.message || "Duyệt yêu cầu thất bại");
    }
  };

  const handleReject = async (id) => {
    try {
      await authorRequestApi.reject(id);
      message.success("Đã từ chối yêu cầu!");
      fetchRequests();
    } catch (error) {
      message.error(error?.response?.data?.message || "Từ chối yêu cầu thất bại");
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
        Yêu Cầu Trở Thành Tác Giả
      </h1>

      <AuthorRequestTable
        requests={requests}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </AdminLayout>
  );
}