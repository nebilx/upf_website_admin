import { Helmet } from "react-helmet-async";

// mock
import { getAllJobData } from "../redux/store/slice/index.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobList from "../section/job/JobList";
import JobPList from "../section/job/JobPList";
import { Container, Stack } from "@mui/material";
import Loaders from "../components/Loader/loader";

export default function JobPage() {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.index.Job);
  const jobP = useSelector((state) => state.index.JobPosition);
  const isLoading = useSelector((state) => state.index.isLoading);

  useEffect(() => {
    dispatch(getAllJobData());
  }, [dispatch]);

  const navigator = useNavigate();
  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/job");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <>
          <Helmet>
            <title> Job </title>
          </Helmet>
          <Container>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              {" "}
              {jobP && <JobPList jobP={jobP} />}
              {job && <JobList job={job} />}
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}
