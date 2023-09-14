import { createSlice } from "@reduxjs/toolkit";

const indexSlice = createSlice({
  name: "ufp",
  initialState: {
    news: [],
    product: [],
    banner: [],
    customer: [],
    forum: [],
    isLoading: false,
    message: "",
    error: "",
  },
  reducers: {
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
    deleteProduct(state) {
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
  getAllNews,
  getAllBanner,
  getAllCustomer,
  getAllProduct,
  getAllForum,
  getNews,
  getBanner,
  getCustomer,
  getProduct,
  setAllNews,
  setAllBanner,
  setAllCustomer,
  setAllProduct,
  setAllForum,
  setNews,
  setBanner,
  setCustomer,
  setProduct,
  addNews,
  addBanner,
  addCustomer,
  addProduct,
  editNews,
  editBanner,
  editCustomer,
  editProduct,
  deleteNews,
  deleteBanner,
  deleteCustomer,
  deleteProduct,
  deleteForum,
  setIsLoading,
  setMessage,
  setError,
} = indexSlice.actions;

export default indexSlice.reducer;
