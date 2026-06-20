import axiosClient from "./axiosClient";

const chapterApi = {
  getByMangaId(mangaId) {
    return axiosClient.get(`/chapters/manga/${mangaId}`);
  },

  getById(chapterId) {
    return axiosClient.get(`/chapters/${chapterId}`);
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