import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { setMessage, setError } from "./redux/store/slice/index.slice";
import PrivateRoute from "./PrivateRoutes";
// layouts
import Main_layout from "./layout/main/main_layout";
import Simple_layout from "./layout/simple/simple_layout";

import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import BannersPage from "./pages/BannersPage";
import NewsPage from "./pages/NewsPage";
import CustomerPage from "./pages/CustomerPage";
import ForumPage from "./pages/ForumPage";
import DashboardAppPage from "./pages/DashboardPage";
import JobPage from "./pages/JobPage";

// ----------------------------------------------------------------------

export default function Router() {
  const message = useSelector((state) => state.index.message);
  const error = useSelector((state) => state.index.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message !== "") toast.success(message);
    dispatch(setMessage(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (error !== "") toast.error(error);
    dispatch(setError(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/dashboard" element={<Main_layout />}>
        <Route index element={<Navigate to="app" />} />
        <Route
          path="app"
          element={<PrivateRoute element={DashboardAppPage} />}
        />
        <Route
          path="product"
          element={<PrivateRoute element={ProductsPage} />}
        />
        <Route path="banner" element={<PrivateRoute element={BannersPage} />} />
        <Route path="news" element={<PrivateRoute element={NewsPage} />} />
        <Route
          path="customer"
          element={<PrivateRoute element={CustomerPage} />}
        />
        <Route path="forum" element={<PrivateRoute element={ForumPage} />} />
        <Route path="job" element={<PrivateRoute element={JobPage} />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route element={<Simple_layout />}>
        <Route index element={<Navigate to="/dashboard/app" />} />
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
