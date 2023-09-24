import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

import {
  getAllJobData,
  getAllJob,
  deleteJob,
  getAllJobP,
  addJobP,
  editJobP,
  deleteJobP,
} from "../../store/slice/index.slice";

import {
  handleGetAllJobData,
  handleGetAllJob,
  handleDeleteJob,
  handleGetAllJobP,
  handleAddJobP,
  handleEditJobP,
  handleDeleteJobP,
} from "../handler/job.handler";

function* getAllJobDataSaga() {
  yield takeLatest(getAllJobData.type, handleGetAllJobData);
}

function* getAllJobSaga() {
  yield takeLatest(getAllJob.type, handleGetAllJob);
}
function* deleteJobSaga() {
  yield takeEvery(deleteJob.type, handleDeleteJob);
}

function* getAllJobPSaga() {
  yield takeLatest(getAllJobP.type, handleGetAllJobP);
}

function* addJobPSaga() {
  yield takeEvery(addJobP.type, handleAddJobP);
}

function* editJobPSaga() {
  yield takeEvery(editJobP.type, handleEditJobP);
}

function* deleteJobPSaga() {
  yield takeEvery(deleteJobP.type, handleDeleteJobP);
}

export default function* JobSaga() {
  yield all([
    fork(getAllJobDataSaga),
    fork(getAllJobSaga),
    fork(deleteJobSaga),
    fork(getAllJobPSaga),
    fork(addJobPSaga),
    fork(editJobPSaga),
    fork(deleteJobPSaga),
  ]);
}
