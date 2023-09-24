import axios from "./Axios.Config";
export const requestsDash = {
  getAllDash: () =>
    axios.request({
      method: "get",
      url: `/api/dashboard`,
    }),
};
