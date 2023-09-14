import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import BannerCard from "./BannerCard";

// ----------------------------------------------------------------------

BannerList.propTypes = {
  banners: PropTypes.array.isRequired,
};

export default function BannerList({ banners, ...other }) {
  return (
    <Grid container spacing={3} direction={"column"} {...other}>
      {banners.map((banner) => (
        <Grid key={banner._id} item xs={12} container>
          <BannerCard banner={banner} />
        </Grid>
      ))}
    </Grid>
  );
}
