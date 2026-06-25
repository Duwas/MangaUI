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
  changeRole(id, role) {
  return axiosClient.put(`/auth/users/${id}/role`, {
    role,
  });
},
};

export default authApi;