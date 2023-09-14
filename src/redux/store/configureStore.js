import { configureStore, combineReducers } from "@reduxjs/toolkit";
import watcherSaga from "../saga/watchsaga/index.saga";
import createSagaMiddleware from "redux-saga";
import indexSlice from "./slice/index.slice";
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  index: indexSlice,
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watcherSaga);

export default store;
