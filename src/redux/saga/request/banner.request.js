import axios from "axios";
axios.defaults.baseURL = "https://upf-backend.onrender.com";

export const requestsBanner = {
  getAllBanner: () =>
    axios.request({
      method: "get",
      url: `/api/banner`,
    }),

  getBanner: (id) =>
    axios.request({
      method: "get",
      url: `/api/banner/${id}`,
    }),

  addBanner: (data) =>
    axios.request({
      method: "post",
      url: `/api/banner`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  editBanner: (data) =>
    axios.request({
      method: "put",
      url: `/api/banner`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteBanner: (data) =>
    axios.request({
      method: "delete",
      url: `/api/banner`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
