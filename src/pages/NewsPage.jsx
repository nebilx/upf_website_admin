import { Helmet } from "react-helmet-async";
// @mui
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import NewsList from "../section/news/NewsList";
import NewsSort from "../section/news/NewsSort";
import Iconify from "../components/iconify/Iconify";
// mock
import NEWS from "../_mock/news";
import NewsAdd from "../section/news/NewsAdd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllNews } from "../redux/store/slice/index.slice";
import Loading from "../components/Loader/Loading";

export default function NewsPage() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const news = useSelector((state) => state.index.news);
  // const navigate = useNavigate();
  const isLoading = useSelector((state) => state.index.isLoading);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title> Universal News</title>
          </Helmet>

          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                News
              </Typography>
              <Button
                onClick={handleOpen}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New News
              </Button>
            </Stack>
            <NewsAdd openDia={open} onCloseDia={handleClose} />

            {/* <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <NewsSort />
              </Stack>
            </Stack> */}

            <NewsList news={news} />
          </Container>
        </>
      )}
    </>
  );
}
