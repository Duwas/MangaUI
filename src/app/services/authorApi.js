import axiosClient from "./axiosClient";

const authorApi = {
  sendRequest(data) {
    return axiosClient.post("/author-requests", data);
  },

  getAllRequests() {
    return axiosClient.get("/author-requests");
  },

  approve(id) {
    return axiosClient.put(`/author-requests/${id}/approve`);
  },

  reject(id) {
    return axiosClient.put(`/author-requests/${id}/reject`);
  },
};

export default authorApi;