import { Avatar, Spin } from "antd";
import { UserOutlined, RobotOutlined, LoadingOutlined } from "@ant-design/icons";
import styles from "./ChatMessage.module.css";

export default function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={isUser ? styles.userContainer : styles.aiContainer}>
      {!isUser && (
        <Avatar 
          icon={<RobotOutlined />} 
          style={{ backgroundColor: '#1890ff', flexShrink: 0 }} 
        />
      )}
      
      <div className={isUser ? styles.userMessage : styles.aiMessage}>
        {message.isTyping ? (
           <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#1890ff' }} spin />} />
        ) : (
           <div style={{ whiteSpace: "pre-wrap" }}>{message.text}</div>
        )}
      </div>

      {isUser && (
        <Avatar 
          icon={<UserOutlined />} 
          style={{ backgroundColor: '#87d068', flexShrink: 0 }} 
        />
      )}
    </div>
  );
}