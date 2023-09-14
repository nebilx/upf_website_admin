import { call, put } from "redux-saga/effects";
import {
  setAllNews,
  getAllNews,
  setNews,
  setIsLoading,
  setMessage,
  setError,
} from "../../store/slice/index.slice";
import { requestsNews } from "../request/news.request";

export function* handleGetAllNews() {
  try {
    const news = yield call(requestsNews.getAllNews);
    yield put(setAllNews(news.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleGetNews() {
  try {
    const news = yield call(requestsNews.getNews);
    yield put(setNews(news.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleAddNews(action) {
  try {
    const news = yield call(requestsNews.addNews, action.payload.data);
    yield put(setMessage(news.data.message));
    yield put(getAllNews());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleEditNews(action) {
  try {
    const news = yield call(requestsNews.editNews, action.payload.data);
    yield put(setMessage(news.data.message));
    yield put(getAllNews());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleDeleteNews(action) {
  try {
    const news = yield call(requestsNews.deleteNews, action.payload.data);
    yield put(setMessage(news.data.message));
    yield put(getAllNews());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}
