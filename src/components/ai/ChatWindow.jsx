"use client";

import { Drawer, Button, Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import chatApi from "@/services/chatApi";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow({ open, onClose }) {
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Xin chào 👋 Tôi là Comic AI. Tôi có thể giúp bạn tìm truyện và giải đáp thắc mắc."
        }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleClearChat = () => {
        setMessages([
            {
                sender: "ai",
                text: "Xin chào 👋 Tôi là Comic AI. Tôi có thể giúp bạn tìm truyện và giải đáp thắc mắc."
            }
        ]);
    };

    const handleSend = async (text) => {
        if (!text.trim() || loading) return;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text
            }
        ]);

        setLoading(true);

        try {
            const response = await chatApi.sendMessage(text);
            
            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: response.data.reply
                }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: "Xin lỗi, hiện tại tôi đang quá tải hoặc có lỗi xảy ra. Bạn vui lòng thử lại sau nhé 😥"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title="Comic AI"
            placement="right"
            width={420}
            open={open}
            onClose={onClose}
            extra={
                <Space>
                    <Tooltip title="Xóa đoạn chat">
                        <Button 
                            icon={<DeleteOutlined />} 
                            onClick={handleClearChat} 
                            type="text" 
                            danger
                        />
                    </Tooltip>
                </Space>
            }
        >
            <div
                style={{
                    height: "calc(100vh - 180px)",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginBottom: 20,
                    paddingRight: 8
                }}
            >
                {messages.map((m, index) => (
                    <ChatMessage
                        key={index}
                        message={m}
                    />
                ))}
                
                {loading && (
                    <ChatMessage message={{ sender: "ai", isTyping: true }} />
                )}
                
                <div ref={messagesEndRef} />
            </div>

            <ChatInput
                onSend={handleSend}
                loading={loading}
            />
        </Drawer>
    );
}