import { Box } from "@mui/material";

import upf_logo from "/assets/images/logo/upf_logo.png";

export default function Logo() {
  return (
    <Box
      component="img"
      src={upf_logo}
      sx={{ width: 100, height: 70, alignItems: "center" }}
    />
  );
}
