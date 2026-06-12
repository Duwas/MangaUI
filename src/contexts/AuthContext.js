"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { message } from "antd";
import authApi from "@/services/authApi";
import { getItem, setItem, removeItem } from "@/utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = getItem("auth_user");
    const savedToken = getItem("token");

    if (savedUser) setUser(savedUser);
    if (savedToken) setToken(savedToken);

    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);

    try {
      const res = await authApi.login({
        email,
        password,
      });

      const loginData = res.data;

      setUser(loginData.user);
      setToken(loginData.token);

      setItem("auth_user", loginData.user);
      setItem("token", loginData.token);

      message.success("Đăng nhập thành công!");

      return loginData;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Đăng nhập thất bại"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setIsLoading(true);

    try {
      const res = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      message.success("Đăng ký thành công!");

      return res.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Đăng ký thất bại"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);

    removeItem("auth_user");
    removeItem("token");

    message.info("Đã đăng xuất");
  }, []);

  const updateProfile = useCallback(async (data) => {
    const updated = { ...user, ...data };

    setUser(updated);
    setItem("auth_user", updated);

    message.success("Cập nhật thông tin thành công!");

    return updated;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
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