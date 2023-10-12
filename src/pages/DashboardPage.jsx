import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container, Typography, Button, Stack } from "@mui/material";

import AppWidgetSummary from "../section/dashboard/AppWidgetSummary";
import { getDash } from "../redux/store/slice/index.slice";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../components/iconify/Iconify";
import Loaders from "../components/Loader/loader";
export default function DashboardAppPage() {
  const dispatch = useDispatch();
  const dash = useSelector((state) => state.index.dash);
  const isLoading = useSelector((state) => state.index.isLoading);
  const handleDash = () => {
    dispatch(getDash());
  };

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <>
          <Helmet>
            <title> Dashboard </title>
          </Helmet>

          <Container maxWidth="xl">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Hi, Welcome back
              </Typography>
              <Button
                variant="contained"
                onClick={handleDash}
                startIcon={<Iconify icon="tabler:refresh" />}
              >
                Check
              </Button>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Product"
                  total={dash.productCount}
                  icon={"gridicons:product"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Customer"
                  total={dash.customerCount}
                  color="info"
                  icon={"mdi:partnership-outline"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="News"
                  total={dash.newsCount}
                  color="warning"
                  icon={"fluent-mdl2:news"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Banner"
                  total={dash.bannerCount}
                  color="error"
                  icon={"ph:flag-banner-bold"}
                />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
