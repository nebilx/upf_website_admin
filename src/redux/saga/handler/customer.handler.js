import { call, put } from "redux-saga/effects";
import {
  setAllCustomer,
  getAllCustomer,
  setCustomer,
  setIsLoading,
  setMessage,
  setError,
} from "../../store/slice/index.slice";
import { requestsCustomer } from "../request/customer.request";

export function* handleGetAllCustomer() {
  try {
    const customer = yield call(requestsCustomer.getAllCustomer);
    yield put(setAllCustomer(customer.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleGetCustomer() {
  try {
    const customer = yield call(requestsCustomer.getCustomer);
    yield put(setCustomer(customer.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleAddCustomer(action) {
  try {
    const customer = yield call(
      requestsCustomer.addCustomer,
      action.payload.data
    );

    yield put(setMessage(customer.data.message));
    yield put(getAllCustomer());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleEditCustomer(action) {
  try {
    const customer = yield call(
      requestsCustomer.editCustomer,
      action.payload.data
    );
    yield put(setMessage(customer.data.message));
    yield put(getAllCustomer());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleDeleteCustomer(action) {
  try {
    const customer = yield call(
      requestsCustomer.deleteCustomer,
      action.payload.data
    );
    yield put(setMessage(customer.data.message));
    yield put(getAllCustomer());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}
