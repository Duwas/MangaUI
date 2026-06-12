"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import RegisterModal from "@/components/auth/RegisterModal";

export default function AppLayout({ children }) {

  const [openRegister, setOpenRegister] = useState(false);

  return (
    <>
      <Header
        onRegisterClick={() =>
          setOpenRegister(true)
        }
      />

      <main>
        {children}
      </main>

      <RegisterModal
        visible={openRegister}
        onClose={() =>
          setOpenRegister(false)
        }
      />
    </>
  );
}