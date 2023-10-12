import { Helmet } from "react-helmet-async";
// @mui
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import CustomerList from "../section/customer/CustomerList";
import Iconify from "../components/iconify/Iconify";
// mock
import CustomerAdd from "../section/customer/CustomerAdd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../redux/store/slice/index.slice";
import Loaders from "../components/Loader/loader";

// ----------------------------------------------------------------------

export default function CustomersPage() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.index.customer);

  // const navigate = useNavigate();
  const isLoading = useSelector((state) => state.index.isLoading);

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <>
          <Helmet>
            <title> Customer</title>
          </Helmet>

          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Customers
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpen}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Customer
              </Button>
            </Stack>
            <CustomerAdd openDia={open} onCloseDia={handleClose} />
            {/* <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <CustomerSort />
              </Stack>
            </Stack> */}

            <CustomerList customers={customer} />
          </Container>
        </>
      )}
    </>
  );
}
