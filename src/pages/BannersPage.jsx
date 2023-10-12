import { Helmet } from "react-helmet-async";
// @mui
import { Container, Stack, Typography, Button } from "@mui/material";
// components
import BannerList from "../section/banner/BannerList";
import Iconify from "../components/iconify/Iconify";
// mock
import BannerAdd from "../section/banner/BannerAdd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBanner } from "../redux/store/slice/index.slice";
import Loaders from "../components/Loader/loader";

// ----------------------------------------------------------------------

export default function BannersPage() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.index.banner);
  // const navigate = useNavigate();
  const isLoading = useSelector((state) => state.index.isLoading);

  useEffect(() => {
    dispatch(getAllBanner());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <>
          <Helmet>
            <title> Banner</title>
          </Helmet>

          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Banners
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpen}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Banner
              </Button>
            </Stack>
            <BannerAdd openDia={open} onCloseDia={handleClose} />
            {/* <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 2 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <BannerSort />
              </Stack>
            </Stack> */}

            <BannerList banners={banner} />
          </Container>
        </>
      )}
    </>
  );
}
