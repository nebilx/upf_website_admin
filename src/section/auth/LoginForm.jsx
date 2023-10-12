// @mui
import {
  Stack,
  IconButton,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
// components
import Iconify from "../../components/iconify/Iconify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../redux/store/slice/index.slice";

import { useFormik } from "formik";
import * as Yup from "yup";

// ---------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: Yup.string().min(6).max(30).required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        var AuthFormData = new FormData();

        AuthFormData.append("email", values.email);
        AuthFormData.append("password", values.password);

        dispatch(getLogin({ data: AuthFormData }));
      } catch (error) {
        console.error("Error submitting the form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={5}>
          <TextField
            name="email"
            label="Email address"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            label="Password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            Login
          </Button>
        </Stack>
      </form>

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
    </>
  );
}
