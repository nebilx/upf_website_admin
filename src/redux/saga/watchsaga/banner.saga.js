import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

import {
  getAllBanner,
  getBanner,
  addBanner,
  editBanner,
  deleteBanner,
} from "../../store/slice/index.slice";

import {
  handleGetAllBanner,
  handleGetBanner,
  handleAddBanner,
  handleEditBanner,
  handleDeleteBanner,
} from "../handler/banner.handler";

function* getAllBannerSaga() {
  yield takeLatest(getAllBanner.type, handleGetAllBanner);
}
function* getBannerSaga() {
  yield takeLatest(getBanner.type, handleGetBanner);
}

function* addBannerSaga() {
  yield takeEvery(addBanner.type, handleAddBanner);
}

function* editBannerSaga() {
  yield takeEvery(editBanner.type, handleEditBanner);
}

function* deleteBannerSaga() {
  yield takeEvery(deleteBanner.type, handleDeleteBanner);
}

export default function* BannerSaga() {
  yield all([
    fork(getAllBannerSaga),
    fork(getBannerSaga),
    fork(addBannerSaga),
    fork(editBannerSaga),
    fork(deleteBannerSaga),
  ]);
}
