import axios from "./Axios.Config";

export const requestsAuth = {
  login: (data) =>
    axios.request({
      method: "post",
      url: `/api/auth/login`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
