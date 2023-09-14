import { call, put } from "redux-saga/effects";
import {
  setAllBanner,
  getAllBanner,
  setBanner,
  setIsLoading,
  setMessage,
  setError,
} from "../../store/slice/index.slice";
import { requestsBanner } from "../request/banner.request";

export function* handleGetAllBanner() {
  try {
    const banner = yield call(requestsBanner.getAllBanner);
    yield put(setAllBanner(banner.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleGetBanner() {
  try {
    const banner = yield call(requestsBanner.getBanner);
    yield put(setBanner(banner.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleAddBanner(action) {
  try {
    const banner = yield call(requestsBanner.addBanner, action.payload.data);
    yield put(setMessage(banner.data.message));
    yield put(getAllBanner());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleEditBanner(action) {
  try {
    const banner = yield call(requestsBanner.editBanner, action.payload.data);
    yield put(setMessage(banner.data.message));
    yield put(getAllBanner());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleDeleteBanner(action) {
  try {
    const banner = yield call(requestsBanner.deleteBanner, action.payload.data);
    yield put(setMessage(banner.data.message));
    yield put(getAllBanner());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}
