"use client";

import { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, Divider, message } from "antd";
import { useRouter } from "next/navigation";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginModal({ open, onClose, onSwitchToRegister }) {
  const [form] = Form.useForm();
  const [useRouter] = userRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const loginData = await login(values.email, values.password);
      const role = loginData?.user?.role;

      form.resetFields();
      onClose();

      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "AUTHOR") {
        router.push("/author");
      } else {
        router.push("/");
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      destroyOnClose
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>
          Đăng Nhập
        </h2>
        <p style={{ color: "#9CA3AF", fontSize: 14, marginTop: 8 }}>
          Chào mừng bạn trở lại ComicVerse
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "#6B7280" }} />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#6B7280" }} />}
            placeholder="Mật khẩu"
            size="large"
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Checkbox style={{ color: "#9CA3AF" }}>Ghi nhớ đăng nhập</Checkbox>
          <a style={{ color: "#1DB954", fontSize: 13 }}>Quên mật khẩu?</a>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
          style={{ height: 44, fontWeight: 600 }}
        >
          Đăng nhập
        </Button>
      </Form>

      <Divider style={{ borderColor: "#2D2D4A" }}>
        <span style={{ color: "#6B7280", fontSize: 12 }}>hoặc</span>
      </Divider>

      <div style={{ display: "flex", gap: 12 }}>
        <Button icon={<GoogleOutlined />} block size="large" style={{ flex: 1 }}>
          Google
        </Button>
        <Button icon={<FacebookOutlined />} block size="large" style={{ flex: 1 }}>
          Facebook
        </Button>
      </div>

      <p style={{ textAlign: "center", marginTop: 20, color: "#9CA3AF", fontSize: 14 }}>
        Chưa có tài khoản?{" "}
        <a
          onClick={onSwitchToRegister}
          style={{ color: "#1DB954", cursor: "pointer", fontWeight: 600 }}
        >
          Đăng ký ngay
        </a>
      </p>
    </Modal>
  );
}