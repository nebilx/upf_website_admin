import axios from "axios";
axios.defaults.baseURL = "https://upf-backend.onrender.com/";

export const requestsProduct = {
  getAllProduct: () =>
    axios.request({
      method: "get",
      url: `/api/product`,
    }),

  getProduct: (id) =>
    axios.request({
      method: "get",
      url: `/api/product/${id}`,
    }),

  addProduct: (data) =>
    axios.request({
      method: "post",
      url: `/api/product`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  editProduct: (data) =>
    axios.request({
      method: "put",
      url: `/api/product`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteProduct: (data) =>
    axios.request({
      method: "delete",
      url: `/api/product`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
