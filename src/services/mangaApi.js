import axiosClient from "./axiosClient";

const mangaApi = {
  getAll() {
    return axiosClient.get("/mangas/all");
  },

  getApproved() {
    return axiosClient.get("/mangas/approved");
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
};

export default mangaApi;