import { call, put } from "redux-saga/effects";
import {
  setAllProduct,
  getAllProduct,
  setProduct,
  setIsLoading,
  setMessage,
  setError,
} from "../../store/slice/index.slice";
import { requestsProduct } from "../request/product.requests";

export function* handleGetAllProduct() {
  try {
    const product = yield call(requestsProduct.getAllProduct);
    yield put(setAllProduct(product.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleGetProduct() {
  try {
    const product = yield call(requestsProduct.getProduct);
    yield put(setProduct(product.data.data));
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleAddProduct(action) {
  try {
    const product = yield call(requestsProduct.addProduct, action.payload.data);
    yield put(setMessage(product.data.message));
    yield put(getAllProduct());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleEditProduct(action) {
  try {
    const product = yield call(
      requestsProduct.editProduct,
      action.payload.data
    );
    yield put(setMessage(product.data.message));
    yield put(getAllProduct());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}

export function* handleDeleteProduct(action) {
  try {
    const product = yield call(
      requestsProduct.deleteProduct,
      action.payload.data
    );
    yield put(setMessage(product.data.message));
    yield put(getAllProduct());
    yield put(setIsLoading());
  } catch (error) {
    yield put(setIsLoading());
    yield put(setError(error.response.data.error.message));
  }
}
