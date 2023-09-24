import { Helmet } from "react-helmet-async";

// mock
import { getAllForum } from "../redux/store/slice/index.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForumList from "../section/forum/ForumList";
// ----------------------------------------------------------------------

export default function ForumPage() {
  const dispatch = useDispatch();
  const forum = useSelector((state) => state.index.forum);
  const isLoading = useSelector((state) => state.index.isLoading);

  useEffect(() => {
    dispatch(getAllForum());
  }, [dispatch]);

  const navigator = useNavigate();
  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/forum");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <div className="ContainerLoader">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <Helmet>
            <title> User </title>
          </Helmet>
          {forum && <ForumList forum={forum} />}
        </>
      )}
    </>
  );
}
