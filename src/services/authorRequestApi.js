import axiosClient from "./axiosClient";

const authorRequestApi = {
  getAll() {
    return axiosClient.get("/author-requests");
  },

  create(data) {
    return axiosClient.post("/author-requests", data);
  },

  approve(id) {
    return axiosClient.put(`/author-requests/${id}/approve`);
  },

  reject(id) {
    return axiosClient.put(`/author-requests/${id}/reject`);
  },
};

export default authorRequestApi;