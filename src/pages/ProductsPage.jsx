import { Helmet } from "react-helmet-async";

// @mui
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import ProductList from "../section/product/ProductList";
import ProductSort from "../section/product/ProductSort";
import Iconify from "../components/iconify/Iconify";
// mock
import ProductAdd from "../section/product/ProductAdd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/store/slice/index.slice";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const product = useSelector((state) => state.index.product);
  const isLoading = useSelector((state) => state.index.isLoading);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="ContainerLoader">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <Helmet>
            <title> Universal Products</title>
          </Helmet>

          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Product
              </Typography>
              <Button
                onClick={handleOpen}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Products
              </Button>
            </Stack>
            <ProductAdd openDia={open} onCloseDia={handleClose} />

            {/* <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProductSort />
              </Stack>
            </Stack> */}

            <ProductList products={product} />
          </Container>
        </>
      )}
    </>
  );
}
