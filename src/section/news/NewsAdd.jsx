import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNews } from "../../redux/store/slice/index.slice";

import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import Loaders from "../../components/Loader/loader";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

// ----------------------------------------------------------------------

NewsAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function NewsAdd({ openDia, onCloseDia }) {
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

  const [Image, setImage] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("News Name is required")
      .min(3, "News Name cannot below 3 characters ")
      .max(20, "News Name cannot exceed 20 characters"),
    description: Yup.string()
      .required("News Description is required")
      .min(3, "News Name cannot below 3 characters ")
      .max(200, "News Description cannot exceed 200 characters"),
    p_date: Yup.date()
      .required("News Date is required")
      .typeError("Valid date is required")
      .max(new Date(), "News Date cannot be in the future")
      .min(new Date(1900, 0, 1), "News Date cannot be before 1900"),
    image: Yup.mixed()
      .test(
        "fileType",
        "Invalid file type. Only image files are allowed.",
        (value) => {
          if (!value) return true; // No file provided is considered valid
          return /(jpg|jpeg|png)$/.test(value.type);
        }
      )
      .test(
        "fileSize",
        "File size is too large. Maximum size is 5MB.",
        (value) => {
          if (!value) return true; // No file provided is considered valid
          return value.size < 5 * 1024 * 1024; // 5MB
        }
      ),
    status: Yup.boolean().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      p_date: null,
      status: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        var NewsFormData = new FormData();

        NewsFormData.append("name", values.name);
        NewsFormData.append("description", values.description);
        NewsFormData.append(
          "p_date",
          dayjs(values.p_date).format("YYYY-MM-DD")
        );
        NewsFormData.append("n_image", values.image);
        NewsFormData.append("status", values.status);

        await dispatch(addNews({ data: NewsFormData }));
      } catch (error) {
        console.error("Error submitting the form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.image && !formik.errors.image) {
      setImage(URL.createObjectURL(formik.values.image));
    } else {
      setImage(null);
    }
  }, [formik.values.image, formik.errors.image]);

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <Dialog open={isOpen} onClose={onCloseDia}>
          <DialogTitle>Add News</DialogTitle>

          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  name="name"
                  label="News Name"
                  required
                  maxLength="20"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  name="description"
                  label="News Description"
                  required
                  maxLength="200"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DemoItem>
                      <DatePicker
                        label="News Date"
                        value={formik.values.p_date}
                        onChange={(date) =>
                          formik.setFieldValue("p_date", date)
                        }
                      >
                        {({ inputProps }) => (
                          <TextField
                            {...inputProps}
                            error={
                              formik.touched.p_date && formik.errors.p_date
                            }
                            helperText={
                              formik.touched.p_date && formik.errors.p_date
                            }
                          />
                        )}
                      </DatePicker>
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>

                {formik.touched.p_date && formik.errors.p_date && (
                  <p style={{ color: "red" }}>{formik.errors.p_date}</p>
                )}
                <Button
                  component="label"
                  variant="contained"
                  href="#file-upload"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    required
                    accept="image/*"
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    onChange={(e) => {
                      formik.setFieldValue("image", e.target.files[0]);
                    }}
                  />
                </Button>
                {formik.touched.image && formik.errors.image && (
                  <p style={{ color: "red" }}>{formik.errors.image}</p>
                )}
                {Image && (
                  <div>
                    <h3>Selected Image:</h3>
                    <img
                      src={Image}
                      alt="Selected"
                      height="200px"
                      width="200px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}

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
