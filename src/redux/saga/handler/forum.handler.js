import { call, put } from "redux-saga/effects";
import {
  setAllForum,
  getAllForum,
  setIsLoading,
  setMessage,
  setError,
} from "../../store/slice/index.slice";
import { requestsForum } from "../request/forum.requests";

export function* handleGetAllForum() {
  try {
    const forum = yield call(requestsForum.getAllForum);
    yield put(setAllForum(forum.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleDeleteForum(action) {
  try {
    const forum = yield call(requestsForum.deleteForum, action.payload.data);
    yield put(setMessage(forum.data.message));
    yield put(getAllForum());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}
