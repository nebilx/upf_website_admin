import { call, put } from "redux-saga/effects";

import {
  setAllJob,
  setAllJobP,
  getAllJobP,
  setIsLoading,
  setMessage,
  setError,
  getAllJob,
} from "../../store/slice/index.slice";

import { requestsJob } from "../request/job.request";

export function* handleGetAllJobData() {
  try {
    const job = yield call(requestsJob.getAllJob);
    const jobP = yield call(requestsJob.getAllJobP);

    yield put(setAllJobP(jobP.data.data));
    yield put(setAllJob(job.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleGetAllJob() {
  try {
    const job = yield call(requestsJob.getAllJob);
    yield put(setAllJob(job.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleDeleteJob(action) {
  try {
    const job = yield call(requestsJob.deleteJob, action.payload.data);
    yield put(setMessage(job.data.message));
    yield put(getAllJob());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleGetAllJobP() {
  try {
    const jobP = yield call(requestsJob.getAllJobP);
    yield put(setAllJobP(jobP.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleAddJobP(action) {
  try {
    const jobP = yield call(requestsJob.addJobP, action.payload.data);
    yield put(setMessage(jobP.data.message));
    yield put(getAllJobP());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleEditJobP(action) {
  try {
    const jobP = yield call(requestsJob.editJobP, action.payload.data);
    yield put(setMessage(jobP.data.message));
    yield put(getAllJobP());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleDeleteJobP(action) {
  try {
    const jobP = yield call(requestsJob.deleteJobP, action.payload.data);
    yield put(setMessage(jobP.data.message));
    yield put(getAllJobP());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}
