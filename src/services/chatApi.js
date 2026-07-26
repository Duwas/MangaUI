import axiosClient from "./axiosClient";

const chatApi = {
  sendMessage(message) {
    return axiosClient.post("/chat", {
      message,
    });
  },
};

export default chatApi;