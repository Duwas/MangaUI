"use client";

import { useState } from "react";
import { Drawer } from "antd";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import Footer from "./Footer";



import ChatButton from "@/components/ai/ChatButton";
import ChatWindow from "@/components/ai/ChatWindow";
export default function AppLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChat,setOpenChat]=useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <>
      <Header
        onSidebarClick={() =>
          setOpenSidebar((prev) => !prev)
        }
        onLoginClick={() => {
          setOpenRegister(false);
          setOpenLogin((prev) => !prev);
        }}
        onRegisterClick={() => {
          setOpenLogin(false);
          setOpenRegister((prev) => !prev);
        }}
      />

      <main style={{ paddingTop: "80px" }}>
        {children}
      </main>

      <Drawer
        title="Bảng xếp hạng"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        placement="right"
        size="default"
      >
        <Sidebar />
      </Drawer>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSwitchToRegister={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      />

      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onSwitchToLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
      <ChatButton
        onClick={()=>setOpenChat(true)}
      />

      <ChatWindow
        open={openChat}
        onClose={()=>setOpenChat(false)}
      />
      <Footer />
    </>
  );
}