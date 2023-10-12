import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/store/slice/index.slice";
import { useFormik } from "formik";
import * as Yup from "yup";
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

ProductAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function ProductAdd({ openDia, onCloseDia }) {
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

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Product Name is required")
      .min(3, "Product Name cannot below 3 characters ")
      .max(20, "Product Name cannot exceed 20 characters"),
    category: Yup.string()
      .required("Product Category is required")
      .min(3, "Product Name cannot below 3 characters ")
      .max(20, "Product Category cannot exceed 20 characters"),
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
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      image: null,
      status: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const ProductFormData = new FormData();
        ProductFormData.append("name", values.name);
        ProductFormData.append("category", values.category);
        ProductFormData.append("p_image", values.image);
        ProductFormData.append("status", values.status);

        await dispatch(addProduct({ data: ProductFormData }));
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
          <DialogTitle>Add Product</DialogTitle>

          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  name="name"
                  label="Product Name"
                  required
                  size="20"
                  maxLength="20"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  name="category"
                  label="Product Category"
                  required
                  size="20"
                  maxLength="20"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                />
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
