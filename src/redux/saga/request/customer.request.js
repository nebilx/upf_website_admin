import axios from "./Axios.Config";

export const requestsCustomer = {
  getAllCustomer: () =>
    axios.request({
      method: "get",
      url: `/api/customer`,
    }),

  getCustomer: (id) =>
    axios.request({
      method: "get",
      url: `/api/customer/${id}`,
    }),

  addCustomer: (data) =>
    axios.request({
      method: "post",
      url: `/api/customer`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  editCustomer: (data) =>
    axios.request({
      method: "put",
      url: `/api/customer`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteCustomer: (data) =>
    axios.request({
      method: "delete",
      url: `/api/customer`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
