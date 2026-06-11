import axiosClient from "./axiosClient";

const ratingApi = {
  create(data) {
    return axiosClient.post("/ratings", data);
  },

  getByMangaId(mangaId) {
    return axiosClient.get(`/ratings/manga/${mangaId}`);
  },
};

export default ratingApi;