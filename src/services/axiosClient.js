import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const publicUrls = ["/auth/register", "/auth/login"];

  if (token && !publicUrls.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;