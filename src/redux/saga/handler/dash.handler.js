import { call, put } from "redux-saga/effects";

import { requestsDash } from "../request/dash.request";
import {
  setDash,
  setIsLoading,
  setMessage,
  setError,
} from "../../store/slice/index.slice";

export function* handleGetAllDash() {
  try {
    const dash = yield call(requestsDash.getAllDash);
    yield put(setMessage("Dashboard Result Success"));
    yield put(setDash(dash.data.data));
    yield put(setIsLoading());
  } catch (error) {
    console.log(error);
    yield put(setIsLoading());
    yield put(setError(error.response.data));
  }
}
