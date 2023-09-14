import { all, fork } from "redux-saga/effects";
import ForumSaga from "./forum.saga";
import BannerSaga from "./banner.saga";
import ProductSaga from "./product.saga";
import NewsSaga from "./news.saga";
import CustomerSaga from "./customer.saga";

export default function* watcherSaga() {
  yield all([
    fork(ForumSaga),
    fork(BannerSaga),
    fork(ProductSaga),
    fork(NewsSaga),
    fork(CustomerSaga),
  ]);
}
