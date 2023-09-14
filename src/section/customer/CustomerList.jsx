import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import CustomerCard from "./CustomerCard";

// ----------------------------------------------------------------------

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
};

export default function CustomerList({ customers, ...other }) {
  return (
    <Grid container spacing={5} {...other}>
      {customers.map((customer) => (
        <Grid key={customer._id} item xs={12} sm={6} md={3}>
          <CustomerCard customer={customer} />
        </Grid>
      ))}
    </Grid>
  );
}
