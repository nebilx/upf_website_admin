import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

import {
  getAllNews,
  getNews,
  addNews,
  editNews,
  deleteNews,
} from "../../store/slice/index.slice";

import {
  handleGetAllNews,
  handleGetNews,
  handleAddNews,
  handleEditNews,
  handleDeleteNews,
} from "../handler/news.handler";

function* getAllNewsSaga() {
  yield takeLatest(getAllNews.type, handleGetAllNews);
}
function* getNewsSaga() {
  yield takeLatest(getNews.type, handleGetNews);
}

function* addNewsSaga() {
  yield takeEvery(addNews.type, handleAddNews);
}

function* editNewsSaga() {
  yield takeEvery(editNews.type, handleEditNews);
}

function* deleteNewsSaga() {
  yield takeEvery(deleteNews.type, handleDeleteNews);
}

export default function* NewsSaga() {
  yield all([
    fork(getAllNewsSaga),
    fork(getNewsSaga),
    fork(addNewsSaga),
    fork(editNewsSaga),
    fork(deleteNewsSaga),
  ]);
}
