import axios from "axios";
axios.defaults.baseURL = "https://upf-backend.onrender.com";

export const requestsBanner = {
  login: (data) =>
    axios.request({
      method: "post",
      url: `/api/auth/login`,
      data,
    }),

  logout: () =>
    axios.request({
      method: "get",
      url: `/api/auth/logout`,
    }),

  register: (data) =>
    axios.request({
      method: "post",
      url: `/api/auth/register`,
      data,
    }),

  refresh: (data) =>
    axios.request({
      method: "get",
      url: `/api/auth/refresh_token`,
      data,
    }),
};
