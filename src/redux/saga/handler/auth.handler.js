import { call, put } from "redux-saga/effects";
import {
  setLogin,
  setLogout,
  setIsLoading,
  setMessage,
  setError,
} from "../../store/slice/index.slice";

import { requestsAuth } from "../request/auth.request";

export function* handleLogin(action) {
  try {
    const authLogin = yield call(requestsAuth.login, action.payload.data);
    localStorage.setItem("token", authLogin.data.data.Token);
    localStorage.setItem("userInfo", authLogin.data.data.name);
    const token = authLogin.data.data.Token;
    const name = authLogin.data.data.name;

    yield put(setLogin({ data: { token, name } }));
    yield put(setMessage(authLogin.data.message));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleLogout() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    yield put(setMessage("Logout Success"));
    yield put(setLogout());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}
