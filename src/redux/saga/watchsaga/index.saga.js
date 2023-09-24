import { all, fork } from "redux-saga/effects";
import ForumSaga from "./forum.saga";
import BannerSaga from "./banner.saga";
import ProductSaga from "./product.saga";
import NewsSaga from "./news.saga";
import CustomerSaga from "./customer.saga";
import AuthSaga from "./auth.saga";
import DashSaga from "./dash.saga";
import JobSaga from "./job.saga";

export default function* watcherSaga() {
  yield all([
    fork(ForumSaga),
    fork(BannerSaga),
    fork(ProductSaga),
    fork(NewsSaga),
    fork(CustomerSaga),
    fork(AuthSaga),
    fork(DashSaga),
    fork(JobSaga),
  ]);
}
