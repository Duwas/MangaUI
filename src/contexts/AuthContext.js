"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import authApi from "@/services/authApi";

const AuthContext = createContext(null);

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;

    return payload.exp < now;
  } catch {
    return true;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("auth_user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    const savedToken = localStorage.getItem("token");

    if (!savedToken || savedToken === "undefined" || isTokenExpired(savedToken)) {
      clearAuth();
      setIsLoading(false);
      return;
    }

    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch {
        clearAuth();
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const res = await authApi.login({
        email,
        password,
      });

      const loginData = res.data;

      if (!loginData?.user || !loginData?.token) {
        throw new Error("Dữ liệu đăng nhập không hợp lệ");
      }

      setUser(loginData.user);
      setToken(loginData.token);

      localStorage.setItem("auth_user", JSON.stringify(loginData.user));
      localStorage.setItem("token", loginData.token);

      message.success("Đăng nhập thành công");

      return loginData;
    } catch (error) {
      message.error(error?.response?.data?.message || "Đăng nhập thất bại");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    message.info("Đã đăng xuất");
  };

  const updateProfile = async (data) => {
    const updated = {
      ...user,
      ...data,
    };

    setUser(updated);
    localStorage.setItem("auth_user", JSON.stringify(updated));

    message.success("Cập nhật thông tin thành công");

    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isLoggedIn: !!user && !!token,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
};