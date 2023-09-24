import { all, fork, takeLatest } from "redux-saga/effects";

import { getLogin, getLogout } from "../../store/slice/index.slice";

import { handleLogin, handleLogout } from "../handler/auth.handler";

function* getLoginSaga() {
  yield takeLatest(getLogin.type, handleLogin);
}

function* getLogoutSaga() {
  yield takeLatest(getLogout.type, handleLogout);
}

export default function* AuthSaga() {
  yield all([fork(getLoginSaga), fork(getLogoutSaga)]);
}
