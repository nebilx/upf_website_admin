// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../components/iconify/Iconify";
import Loading from "../../components/Loader/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../redux/store/slice/index.slice";

// ---------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    dispatch(getLogin({ data: AuthFormData }));
  };

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const isLoading = useSelector((state) => state.index.isLoading);

  const [Auth, setAuth] = useState({
    email: "",
    password: "",
  });

  var AuthFormData = new FormData();

  AuthFormData.append("email", Auth.email);
  AuthFormData.append("password", Auth.password);

  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Stack spacing={3}>
            <TextField
              name="email"
              label="Email address"
              required
              onChange={(e) => setAuth({ ...Auth, email: e.target.value })}
            />

            <TextField
              name="password"
              label="Password"
              required
              onChange={(e) => setAuth({ ...Auth, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ my: 2 }}
          >
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleClick}
          >
            Login
          </LoadingButton>
        </>
      )}
    </>
  );
}
