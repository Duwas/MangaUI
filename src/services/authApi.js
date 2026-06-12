import axiosClient from "./axiosClient";

const authApi = {
  register(data) {
    return axiosClient.post("/auth/register", data);
  },

  login(data) {
    return axiosClient.post("/auth/login", data);
  },

  getAllUsers() {
    return axiosClient.get("/auth/users");
  },
};

export default authApi;