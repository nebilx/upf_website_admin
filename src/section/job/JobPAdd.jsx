import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobP } from "../../redux/store/slice/index.slice";

import { useFormik } from "formik";
import * as Yup from "yup";
import Loaders from "../../components/Loader/loader";

// ----------------------------------------------------------------------

JobPAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function JobPAdd({ openDia, onCloseDia }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(openDia);
  }, [openDia]);

  useEffect(() => {
    if (openDia) {
      onCloseDia();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.index.isLoading);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Job Name is required")
      .min(3, "Job Name cannot below 3 characters ")
      .max(20, "Job Name cannot exceed 20 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      status: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        var JobPFormData = new FormData();

        JobPFormData.append("name", values.name);
        JobPFormData.append("status", values.status);

        await dispatch(addJobP({ data: JobPFormData }));
      } catch (error) {
        console.error("Error submitting the form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <Dialog open={isOpen} onClose={onCloseDia}>
          <DialogTitle>Add Job Position</DialogTitle>

          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  name="name"
                  label="Job Name"
                  required
                  maxLength="20"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <DialogActions>
                  <Button type="submit">Add</Button>
                </DialogActions>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
