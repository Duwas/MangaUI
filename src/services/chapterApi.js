import axiosClient from "./axiosClient";

const chapterApi = {
  getAll() {
    return axiosClient.get("/chapters");
  },

  getById(id) {
    return axiosClient.get(`/chapters/${id}`);
  },

  getByMangaId(mangaId) {
    return axiosClient.get(`/chapters/manga/${mangaId}`);
  },

  create(data) {
    return axiosClient.post("/chapters", data);
  },

  update(id, data) {
    return axiosClient.put(`/chapters/${id}`, data);
  },

  delete(id) {
    return axiosClient.delete(`/chapters/${id}`);
  },
};

export default chapterApi;