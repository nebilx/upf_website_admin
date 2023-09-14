import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import NewsCard from "./NewsCard";

// ----------------------------------------------------------------------

BannersList.propTypes = {
  news: PropTypes.array.isRequired,
};

export default function BannersList({ news, ...other }) {
  return (
    <Grid container spacing={5} flexDirection={"column"} {...other}>
      {news.map((dnews) => (
        <Grid key={dnews._id} item xs={12} container>
          <NewsCard dnews={dnews} />
        </Grid>
      ))}
    </Grid>
  );
}
