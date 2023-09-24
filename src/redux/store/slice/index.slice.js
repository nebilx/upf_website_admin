import { createSlice } from "@reduxjs/toolkit";

const indexSlice = createSlice({
  name: "ufp",
  initialState: {
    dash: [],
    news: [],
    product: [],
    banner: [],
    customer: [],
    Job: [],
    JobPosition: [],
    forum: [],
    isLoading: false,
    message: "",
    error: "",
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("userInfo") || null,
  },
  reducers: {
    getDash(state) {
      state.isLoading = true;
    },
    setDash(state, action) {
      state.dash = action.payload;
    },
    getLogin(state) {
      state.isLoading = true;
    },
    getLogout(state) {
      state.isLoading = true;
    },
    setLogin(state, action) {
      state.token = action.payload.data.token;
      state.user = action.payload.data.name;
    },
    setLogout(state) {
      state.token = null;
      state.user = null;
    },
    getAllJob(state) {
      state.isLoading = true;
    },
    getAllJobP(state) {
      state.isLoading = true;
    },
    getAllNews(state) {
      state.isLoading = true;
    },
    getAllProduct(state) {
      state.isLoading = true;
    },
    getAllBanner(state) {
      state.isLoading = true;
    },
    getAllCustomer(state) {
      state.isLoading = true;
    },
    getAllForum(state) {
      state.isLoading = true;
    },
    getAllJobData(state) {
      state.isLoading = true;
    },

    getNews(state) {
      state.isLoading = true;
    },
    getProduct(state) {
      state.isLoading = true;
    },
    getBanner(state) {
      state.isLoading = true;
    },
    getCustomer(state) {
      state.isLoading = true;
    },
    setAllJob(state, action) {
      state.Job = action.payload;
    },
    setAllJobP(state, action) {
      state.JobPosition = action.payload;
    },
    setAllNews(state, action) {
      state.news = action.payload;
    },
    setAllProduct(state, action) {
      state.product = action.payload;
    },
    setAllBanner(state, action) {
      state.banner = action.payload;
    },
    setAllCustomer(state, action) {
      state.customer = action.payload;
    },
    setAllForum(state, action) {
      state.forum = action.payload;
    },

    setNews(state, action) {
      state.news = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setBanner(state, action) {
      state.banner = action.payload;
    },
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    addJobP(state) {
      state.isLoading = true;
    },
    addNews(state) {
      state.isLoading = true;
    },
    editNews(state) {
      state.isLoading = true;
    },
    deleteNews(state) {
      state.isLoading = true;
    },

    addProduct(state) {
      state.isLoading = true;
    },

    editProduct(state) {
      state.isLoading = true;
    },
    editJobP(state) {
      state.isLoading = true;
    },
    deleteProduct(state) {
      state.isLoading = true;
    },
    deleteJobP(state) {
      state.isLoading = true;
    },
    deleteJob(state) {
      state.isLoading = true;
    },

    addBanner(state) {
      state.isLoading = true;
    },
    editBanner(state) {
      state.isLoading = true;
    },
    deleteBanner(state) {
      state.isLoading = true;
    },

    addCustomer(state) {
      state.isLoading = true;
    },
    editCustomer(state) {
      state.isLoading = true;
    },
    deleteCustomer(state) {
      state.isLoading = true;
    },

    deleteForum(state) {
      state.isLoading = true;
    },

    setIsLoading(state) {
      state.isLoading = false;
    },

    //success message
    setMessage(state, action) {
      state.message = action.payload;
    },
    //error messages
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  getAllJobData,
  getDash,
  setDash,
  getLogin,
  getLogout,
  setLogin,
  setLogout,
  getAllNews,
  getAllJob,
  getAllJobP,
  getAllBanner,
  getAllCustomer,
  getAllProduct,
  getAllForum,
  getNews,
  getBanner,
  getCustomer,
  getProduct,
  setAllNews,
  setAllJob,
  setAllJobP,
  setAllBanner,
  setAllCustomer,
  setAllProduct,
  setAllForum,
  setNews,
  setBanner,
  setCustomer,
  setProduct,
  addNews,
  addJobP,
  addBanner,
  addCustomer,
  addProduct,
  editNews,
  editJobP,
  editBanner,
  editCustomer,
  editProduct,
  deleteNews,
  deleteJobP,
  deleteJob,
  deleteBanner,
  deleteCustomer,
  deleteProduct,
  deleteForum,
  setIsLoading,
  setMessage,
  setError,
} = indexSlice.actions;

export default indexSlice.reducer;
