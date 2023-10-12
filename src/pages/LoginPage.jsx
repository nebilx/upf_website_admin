import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";
// components
import Logo from "../components/logo/Logo";
// sections
import LoginForm from "../section/auth/LoginForm";
import { useSelector } from "react-redux";
import Loading from "../components/Loader/Loading";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const isLoading = useSelector((state) => state.index.isLoading);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title> Login</title>
          </Helmet>

          <StyledRoot>
            <Container maxWidth="sm">
              <StyledContent>
                <Logo
                  sx={{
                    position: "fixed",
                    top: { xs: 16, sm: 24, md: 40 },
                    left: { xs: 16, sm: 24, md: 40 },
                  }}
                />
                <Box sx={{ flexGrow: 0.1 }} />
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ alignSelf: "flex-start" }}
                >
                  Sign in
                </Typography>
                <Box sx={{ flexGrow: 0.1 }} />
                <StyledSection>
                  <LoginForm />
                </StyledSection>
              </StyledContent>
            </Container>
          </StyledRoot>
        </>
      )}
    </>
  );
}
