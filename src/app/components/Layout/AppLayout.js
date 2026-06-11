"use client";

import { useState } from "react";
import Header from "@/app/components/Layout/Header";
import RegisterModal from "@/app/components/RegisterModal";

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