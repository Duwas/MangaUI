"use client";

import { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import authApi from "@/services/authApi";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await authApi.register({
        name: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      message.success("Đăng ký thành công");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(error?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={420} centered destroyOnClose>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>Đăng Ký</h2>
        <p style={{ color: "#9CA3AF", fontSize: 14, marginTop: 8 }}>Tạo tài khoản ComicVerse miễn phí</p>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập tên hiển thị!" },
            { min: 3, message: "Tối thiểu 3 ký tự!" },
          ]}
        >
          <Input prefix={<UserOutlined style={{ color: "#6B7280" }} />} placeholder="Tên hiển thị" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input prefix={<MailOutlined style={{ color: "#6B7280" }} />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Tối thiểu 6 ký tự!" },
          ]}
        >
          <Input.Password prefix={<LockOutlined style={{ color: "#6B7280" }} />} placeholder="Mật khẩu" size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return !value || getFieldValue("password") === value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined style={{ color: "#6B7280" }} />} placeholder="Xác nhận mật khẩu" size="large" />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, v) =>
                v ? Promise.resolve() : Promise.reject(new Error("Bạn cần đồng ý điều khoản!")),
            },
          ]}
        >
          <Checkbox style={{ color: "#9CA3AF" }}>
            Tôi đồng ý với <a style={{ color: "#1DB954" }}>Điều khoản sử dụng</a>
          </Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={loading} style={{ height: 44, fontWeight: 600 }}>
          Đăng ký
        </Button>
      </Form>

      <p style={{ textAlign: "center", marginTop: 20, color: "#9CA3AF", fontSize: 14 }}>
        Đã có tài khoản?{" "}
        <a onClick={onSwitchToLogin} style={{ color: "#1DB954", cursor: "pointer", fontWeight: 600 }}>
          Đăng nhập
        </a>
      </p>
    </Modal>
  );
}