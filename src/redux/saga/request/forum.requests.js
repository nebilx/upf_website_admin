import axios from "axios";
axios.defaults.baseURL = "https://upf-backend.onrender.com";

export const requestsForum = {
  getAllForum: () =>
    axios.request({
      method: "get",
      url: `/api/forum`,
    }),

  deleteForum: (data) =>
    axios.request({
      method: "delete",
      url: `/api/forum`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
