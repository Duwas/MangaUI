import axiosClient from "./axiosClient";

const mangaApi = {
  getApproved() {
    return axiosClient.get("/mangas/approved");
  },

  getAll() {
    return axiosClient.get("/mangas/All");
  },

  getById(id) {
    return axiosClient.get(`/mangas/${id}`);
  },

  create(data) {
    return axiosClient.post("/mangas", data);
  },

  update(id, data) {
    return axiosClient.put(`/mangas/${id}`, data);
  },

  delete(id) {
    return axiosClient.delete(`/mangas/${id}`);
  },

  approve(id) {
    return axiosClient.put(`/mangas/${id}/approve`);
  },

  reject(id) {
    return axiosClient.put(`/mangas/${id}/reject`);
  },
};

export default mangaApi;