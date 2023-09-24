import axios from "./Axios.Config";

export const requestsJob = {
  getAllJob: () =>
    axios.request({
      method: "get",
      url: `/api/job/`,
    }),
  deleteJob: (data) =>
    axios.request({
      method: "delete",
      url: `/api/job/`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getAllJobP: () =>
    axios.request({
      method: "get",
      url: `/api/job/career`,
    }),

  addJobP: (data) =>
    axios.request({
      method: "post",
      url: `/api/job/career`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  editJobP: (data) =>
    axios.request({
      method: "put",
      url: `/api/job/career`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteJobP: (data) =>
    axios.request({
      method: "delete",
      url: `/api/job/career`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
