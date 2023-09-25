import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  ListItemIcon,
} from "@mui/material";

// hooks
import useResponsive from "../../../hooks/useResponsive";
// mock
import account from "../../../_mock/account";

// components
import Logo from "../../../components/logo/Logo";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import NavSection from "../../../components/nav-section/NavSection";
//
import navConfig from "./config";
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../../../redux/store/slice/index.slice";
import Iconify from "../../../components/iconify/Iconify";
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

export const StyledItemIcon = styled(ListItemIcon)({
  width: 30,
  height: 30,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const isLoading = useSelector((state) => state.index.isLoading);
  const message = useSelector((state) => state.index.message);
  const isDesktop = useResponsive("up", "lg");
  const user = useSelector((state) => state.index.user);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (message !== "") {
      navigator("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const handleLogout = () => {
    dispatch(getLogout());
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 5, py: 2, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 3, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            {/* <Avatar src={account.photoURL} alt="photoURL" /> */}

            <StyledItemIcon>
              <Iconify icon="codicon:account" />
            </StyledItemIcon>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user && user}
              </Typography>

              {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography> */}
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      {/* <Box sx={{ flexGrow: 0.3 }} /> */}

      <Box sx={{ px: 2.5, pb: 3 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        >
          <LoadingButton
            isLoading={isLoading}
            onClick={handleLogout}
            target="_blank"
            variant="contained"
          >
            LogOut
          </LoadingButton>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
