"use client";

import React from "react";
import { Modal, Form, Input, Button, Flex, Divider, Typography, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookFilled,
  GoogleOutlined,
} from "@ant-design/icons";
import authApi from "@/app/services/authApi";

const { Text, Title, Link } = Typography;

const RegisterModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await authApi.register({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirm_password,
      });

      message.success("Đăng ký thành công");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Đăng ký thất bại"
      );
    }
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      bodyStyle={{ padding: "20px" }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Title level={3} style={{ marginTop: 0 }}>
          Đăng ký tài khoản
        </Title>
        <Text style={{ color: "#666" }}>
          Đăng ký để mua và theo dõi quá trình đọc truyện
        </Text>
      </div>

      <Form
        form={form}
        name="register_form"
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên người dùng" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          help="Mật khẩu bao gồm ít nhất 6 ký tự"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          help="Mật khẩu bao gồm ít nhất 6 ký tự"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu nhập lại không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập lại mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              backgroundColor: "#00bd9c",
              borderColor: "#00bd9c",
            }}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>
        <Text type="secondary">Hoặc đăng ký với</Text>
      </Divider>

      <Flex gap="small" justify="center" style={{ marginBottom: "20px" }}>
        <Button icon={<FacebookFilled />} style={{ width: "120px" }}>
          Facebook
        </Button>
        <Button icon={<GoogleOutlined />} style={{ width: "120px" }}>
          Google
        </Button>
      </Flex>

      <div style={{ textAlign: "center", fontSize: "12px", color: "#666" }}>
        Bằng việc nhấn “Đăng ký”, bạn đã đọc và đồng ý với
        <Link href="#" style={{ color: "#00bd9c" }}>
          {" "}
          điều kiện và điều khoản
        </Link>{" "}
        của Waka
        <br /> <br />
        Bạn đã có tài khoản?{" "}
        <Link href="#" style={{ color: "#00bd9c" }}>
          Đăng nhập ngay
        </Link>
      </div>
    </Modal>
  );
};

export default RegisterModal;