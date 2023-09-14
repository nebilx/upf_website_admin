import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

import {
  getAllCustomer,
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from "../../store/slice/index.slice";

import {
  handleGetAllCustomer,
  handleGetCustomer,
  handleAddCustomer,
  handleEditCustomer,
  handleDeleteCustomer,
} from "../handler/customer.handler";

function* getAllCustomerSaga() {
  yield takeLatest(getAllCustomer.type, handleGetAllCustomer);
}
function* getCustomerSaga() {
  yield takeLatest(getCustomer.type, handleGetCustomer);
}

function* addCustomerSaga() {
  yield takeEvery(addCustomer.type, handleAddCustomer);
}

function* editCustomerSaga() {
  yield takeEvery(editCustomer.type, handleEditCustomer);
}

function* deleteCustomerSaga() {
  yield takeEvery(deleteCustomer.type, handleDeleteCustomer);
}

export default function* CustomerSaga() {
  yield all([
    fork(getAllCustomerSaga),
    fork(getCustomerSaga),
    fork(addCustomerSaga),
    fork(editCustomerSaga),
    fork(deleteCustomerSaga),
  ]);
}
