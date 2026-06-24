"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
  Spin,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import mangaApi from "@/services/mangaApi";
import mockCategories from "@/data/mockCategories";
import {
  getStatusColor,
  getStatusText,
  formatNumber,
} from "@/utils/helpers";

function createSlug(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function AuthorMangasPage() {
  const [mangas, setMangas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingManga, setEditingManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

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

  const openAddModal = () => {
    setEditingManga(null);
    form.resetFields();
    form.setFieldsValue({
      status: "ONGOING",
      country: "Japan",
    });
    setModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingManga(record);

    form.setFieldsValue({
      title: record.title,
      slug: record.slug,
      author: record.author,
      country: record.country,
      coverImage: record.coverImage,
      bannerImage: record.bannerImage,
      description: record.description,
      status: record.status,
      categoryIds: [],
      hot: record.hot,
      featured: record.featured,
      newManga: record.newManga,
    });

    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await mangaApi.delete(id);
      message.success("Đã xóa truyện");
      fetchMangas();
    } catch (error) {
      console.error("Lỗi xóa truyện:", error);
      message.error(error?.response?.data?.message || "Xóa truyện thất bại");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      const payload = {
        title: values.title,
        slug: values.slug || createSlug(values.title),
        description: values.description,
        coverImage: values.coverImage,
        bannerImage: values.bannerImage,
        author: values.author,
        country: values.country,
        status: values.status,
        hot: Boolean(values.hot),
        featured: Boolean(values.featured),
        newManga: Boolean(values.newManga),
        categoryIds: values.categoryIds || [],
      };

      if (editingManga) {
        await mangaApi.update(editingManga.id, payload);
        message.success("Đã cập nhật truyện");
      } else {
        await mangaApi.create(payload);
        message.success("Đã thêm truyện");
      }

      setModalOpen(false);
      form.resetFields();
      setEditingManga(null);
      fetchMangas();
    } catch (error) {
      console.error("Lỗi lưu truyện:", error);
      message.error(error?.response?.data?.message || "Lưu truyện thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Truyện",
      dataIndex: "title",
      key: "title",
      render: (text, rec) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={rec.coverImage}
            alt=""
            style={{
              width: 36,
              height: 50,
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: 600, color: "#fff" }}>{text}</span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (s) => <Tag color={getStatusColor(s)}>{getStatusText(s)}</Tag>,
    },
    {
      title: "Chương",
      dataIndex: "chapterCount",
      key: "ch",
      width: 80,
      render: (v) => v || 0,
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      width: 100,
      render: (v) => formatNumber(v || 0),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_, rec) => (
        <Space size={4}>
          <Button
            type="text"
            icon={<EditOutlined />}
            style={{ color: "#3B82F6" }}
            onClick={() => openEditModal(rec)}
          />
          <Popconfirm
            title="Xóa truyện này?"
            onConfirm={() => handleDelete(rec.id)}
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>
          Quản Lý Truyện
        </h1>

        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Thêm truyện mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mangas}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 600 }}
      />

      <Modal
        title={editingManga ? "Sửa truyện" : "Thêm truyện mới"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingManga(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Tên truyện"
            rules={[{ required: true, message: "Nhập tên truyện!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item name="slug" label="Slug">
            <Input size="large" placeholder="Tự tạo nếu bỏ trống" />
          </Form.Item>

          <Form.Item
            name="author"
            label="Tác giả"
            rules={[{ required: true, message: "Nhập tác giả!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item name="country" label="Quốc gia" initialValue="Japan">
            <Select
              options={[
                { value: "Japan", label: "Japan" },
                { value: "Korea", label: "Korea" },
                { value: "China", label: "China" },
                { value: "Vietnam", label: "Vietnam" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="coverImage"
            label="Ảnh bìa URL"
            rules={[{ required: true, message: "Nhập URL ảnh bìa!" }]}
          >
            <Input size="large" placeholder="https://res.cloudinary.com/..." />
          </Form.Item>

          <Form.Item name="bannerImage" label="Ảnh banner URL">
            <Input size="large" placeholder="https://res.cloudinary.com/..." />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="categoryIds" label="Thể loại">
            <Select
              mode="multiple"
              placeholder="Chọn thể loại"
              options={mockCategories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
            />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái" initialValue="ONGOING">
            <Select
              options={[
                { value: "ONGOING", label: "Đang tiến hành" },
                { value: "COMPLETED", label: "Hoàn thành" },
                { value: "HIATUS", label: "Tạm ngưng" },
              ]}
            />
          </Form.Item>

          <Form.Item name="hot" label="Truyện hot">
            <Select
              options={[
                { value: true, label: "Có" },
                { value: false, label: "Không" },
              ]}
            />
          </Form.Item>

          <Form.Item name="featured" label="Đề cử">
            <Select
              options={[
                { value: true, label: "Có" },
                { value: false, label: "Không" },
              ]}
            />
          </Form.Item>

          <Form.Item name="newManga" label="Truyện mới">
            <Select
              options={[
                { value: true, label: "Có" },
                { value: false, label: "Không" },
              ]}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={submitting}
          >
            {editingManga ? "Cập nhật truyện" : "Thêm truyện"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}