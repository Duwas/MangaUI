"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
  Space,
  Spin,
  Radio,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import chapterApi from "@/services/chapterApi";
import mangaApi from "@/services/mangaApi";
import { formatDate, formatNumber } from "@/utils/helpers";

export default function AuthorMangaChaptersPage() {
  const params = useParams();
  const router = useRouter();
  const mangaId = params.id;

  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [chapterType, setChapterType] = useState("image");

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [mangaRes, chaptersRes] = await Promise.all([
        mangaApi.getById(mangaId),
        chapterApi.getByMangaId(mangaId),
      ]);
      setManga(mangaRes.data);
      
      // Sort chapters by chapterNumber descending
      const sortedChapters = (chaptersRes.data || []).sort(
        (a, b) => b.chapterNumber - a.chapterNumber
      );
      setChapters(sortedChapters);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
      message.error("Không lấy được dữ liệu chương");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mangaId) {
      fetchData();
    }
  }, [mangaId]);

  const openAddModal = () => {
    setEditingChapter(null);
    form.resetFields();
    setChapterType("image");
    form.setFieldsValue({
      chapterNumber: chapters.length > 0 ? chapters[0].chapterNumber + 1 : 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingChapter(record);
    const type = record.textContent ? "text" : "image";
    setChapterType(type);
    form.setFieldsValue({
      chapterNumber: record.chapterNumber,
      title: record.title,
      images: record.contentImages ? record.contentImages.join("\n") : "",
      textContent: record.textContent,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await chapterApi.delete(id);
      message.success("Đã xóa chương");
      fetchData();
    } catch (error) {
      console.error("Lỗi xóa chương:", error);
      message.error(error?.response?.data?.message || "Xóa chương thất bại");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      let contentImages = [];
      let textContent = "";

      if (chapterType === "image") {
        contentImages = values.images
          ? values.images.split("\n").map((url) => url.trim()).filter((url) => url)
          : [];
        if (contentImages.length === 0) {
          message.error("Vui lòng nhập ít nhất 1 link ảnh!");
          setSubmitting(false);
          return;
        }
      } else {
        textContent = values.textContent;
        if (!textContent?.trim()) {
          message.error("Vui lòng nhập nội dung truyện!");
          setSubmitting(false);
          return;
        }
      }

      const payload = {
        mangaId: parseInt(mangaId),
        chapterNumber: parseInt(values.chapterNumber),
        title: values.title || "",
        contentImages: contentImages,
        textContent: textContent,
      };

      if (editingChapter) {
        await chapterApi.update(editingChapter.id, payload);
        message.success("Đã cập nhật chương");
      } else {
        await chapterApi.create(payload);
        message.success("Đã thêm chương mới");
      }

      setModalOpen(false);
      form.resetFields();
      setEditingChapter(null);
      fetchData();
    } catch (error) {
      console.error("Lỗi lưu chương:", error);
      message.error(error?.response?.data?.message || "Lưu chương thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Chương",
      dataIndex: "chapterNumber",
      key: "num",
      width: 100,
      render: (v) => <span style={{ fontWeight: 600, color: "#1DB954" }}>Ch. {v}</span>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (t) => <span style={{ color: "#fff" }}>{t || "Không có tiêu đề"}</span>,
    },
    {
      title: "Định dạng",
      key: "type",
      width: 120,
      render: (_, rec) => (
        <span style={{ color: "#9CA3AF" }}>
          {rec.textContent ? "Truyện chữ" : "Truyện tranh"}
        </span>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      width: 100,
      render: (v) => formatNumber(v || 0),
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "date",
      width: 140,
      render: (v) => formatDate(v),
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
            title="Xóa chương này?"
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
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        style={{ color: "#9CA3AF", marginBottom: 16 }}
        onClick={() => router.push('/author/mangas')}
      >
        Quay lại Quản lý Truyện
      </Button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>
            Quản Lý Chương
          </h1>
          <p style={{ color: "#1DB954", margin: "4px 0 0 0", fontSize: 16 }}>
            Truyện: {manga?.title}
          </p>
        </div>

        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Thêm chương mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={chapters}
        rowKey="id"
        pagination={{ pageSize: 20 }}
        scroll={{ x: 700 }}
      />

      <Modal
        title={editingChapter ? "Sửa chương" : "Thêm chương mới"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingChapter(null);
          form.resetFields();
        }}
        footer={null}
        width={700}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div style={{ display: "flex", gap: 16 }}>
            <Form.Item
              name="chapterNumber"
              label="Số chương"
              rules={[{ required: true, message: "Nhập số chương!" }]}
              style={{ flex: 1 }}
            >
              <Input type="number" size="large" />
            </Form.Item>

            <Form.Item
              name="title"
              label="Tiêu đề chương (Tùy chọn)"
              style={{ flex: 2 }}
            >
              <Input size="large" placeholder="Ví dụ: Sự khởi đầu" />
            </Form.Item>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: 'rgba(255, 255, 255, 0.85)' }}>Định dạng nội dung</label>
            <Radio.Group 
              value={chapterType} 
              onChange={(e) => setChapterType(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="image">Truyện tranh (Ảnh)</Radio.Button>
              <Radio.Button value="text">Truyện chữ (Text)</Radio.Button>
            </Radio.Group>
          </div>

          {chapterType === "image" ? (
            <Form.Item
              name="images"
              label="Danh sách URL hình ảnh"
              help="Nhập mỗi URL một dòng"
            >
              <Input.TextArea 
                rows={8} 
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" 
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="textContent"
              label="Nội dung truyện chữ"
            >
              <Input.TextArea 
                rows={12} 
                placeholder="Nhập nội dung văn bản của chương ở đây..." 
              />
            </Form.Item>
          )}

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={submitting}
            style={{ marginTop: 16 }}
          >
            {editingChapter ? "Cập nhật chương" : "Đăng chương"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
