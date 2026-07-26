"use client";

import { FloatButton } from "antd";
import { MessageOutlined } from "@ant-design/icons";

export default function ChatButton({ onClick }) {
  return (
    <FloatButton
      icon={<MessageOutlined />}
      type="primary"
      style={{
        right: 30,
        bottom: 30,
      }}
      onClick={onClick}
    />
  );
}