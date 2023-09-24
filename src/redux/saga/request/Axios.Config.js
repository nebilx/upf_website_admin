import axios from "axios";
import store from "../../store/configureStore";

const axiosInstance = axios.create({
  baseURL: "https://upf-backend.onrender.com/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().index.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
