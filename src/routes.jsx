import { Navigate, useRoutes } from "react-router-dom";
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

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMessage, setError } from "./redux/store/slice/index.slice";
import toast from "react-hot-toast";

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

  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <Main_layout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "product", element: <ProductsPage /> },
        { path: "banner", element: <BannersPage /> },
        { path: "news", element: <NewsPage /> },
        { path: "customer", element: <CustomerPage /> },
        { path: "forum", element: <ForumPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <Simple_layout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
