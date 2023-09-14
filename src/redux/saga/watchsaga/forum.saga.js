import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

import { getAllForum, deleteForum } from "../../store/slice/index.slice";

import { handleGetAllForum, handleDeleteForum } from "../handler/forum.handler";

function* getAllForumSaga() {
  yield takeLatest(getAllForum.type, handleGetAllForum);
}

function* deleteForumSaga() {
  yield takeEvery(deleteForum.type, handleDeleteForum);
}

export default function* ForumSaga() {
  yield all([fork(getAllForumSaga), fork(deleteForumSaga)]);
}
