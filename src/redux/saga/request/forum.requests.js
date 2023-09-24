import axios from "./Axios.Config";

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
