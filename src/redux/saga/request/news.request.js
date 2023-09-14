import axios from "axios";
axios.defaults.baseURL = "https://upf-backend.onrender.com";

export const requestsNews = {
  getAllNews: () =>
    axios.request({
      method: "get",
      url: `/api/news`,
    }),

  getNews: (id) =>
    axios.request({
      method: "get",
      url: `/api/news/${id}`,
    }),

  addNews: (data) =>
    axios.request({
      method: "post",
      url: `/api/news`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  editNews: (data) =>
    axios.request({
      method: "put",
      url: `/api/news`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteNews: (data) =>
    axios.request({
      method: "delete",
      url: `/api/news`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
