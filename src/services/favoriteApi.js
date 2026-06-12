import axiosClient from "./axiosClient";

const favoriteApi = {
  add(data) {
    return axiosClient.post("/favorites", data);
  },

  getByUserId(userId) {
    return axiosClient.get(`/favorites/user/${userId}`);
  },

  delete(id) {
    return axiosClient.delete(`/favorites/${id}`);
  },
};

export default favoriteApi;