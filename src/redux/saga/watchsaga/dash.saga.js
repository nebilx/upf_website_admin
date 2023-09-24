import { all, fork, takeLatest } from "redux-saga/effects";
import { getDash } from "../../store/slice/index.slice";
import { handleGetAllDash } from "../handler/dash.handler";

function* getAllDashSaga() {
  yield takeLatest(getDash.type, handleGetAllDash);
}

export default function* DashSaga() {
  yield all([fork(getAllDashSaga)]);
}
