import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";

import {
  getAllProduct,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../store/slice/index.slice";

import {
  handleGetAllProduct,
  handleGetProduct,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
} from "../handler/product.handler";

function* getAllProductSaga() {
  yield takeLatest(getAllProduct.type, handleGetAllProduct);
}
function* getProductSaga() {
  yield takeLatest(getProduct.type, handleGetProduct);
}

function* addProductSaga() {
  yield takeEvery(addProduct.type, handleAddProduct);
}

function* editProductSaga() {
  yield takeEvery(editProduct.type, handleEditProduct);
}

function* deleteProductSaga() {
  yield takeEvery(deleteProduct.type, handleDeleteProduct);
}

export default function* ProductSaga() {
  yield all([
    fork(getAllProductSaga),
    fork(getProductSaga),
    fork(addProductSaga),
    fork(editProductSaga),
    fork(deleteProductSaga),
  ]);
}
