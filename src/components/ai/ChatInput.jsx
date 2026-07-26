"use client";

import { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

export default function ChatInput({ onSend, loading }) {
  const [value, setValue] = useState("");

  return (
    <Search
      placeholder="Nhập câu hỏi..."
      enterButton="Gửi"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(val) => {
          if (val && !loading) {
              onSend(val);
              setValue("");
          }
      }}
      loading={loading}
      disabled={loading}
    />
  );
}