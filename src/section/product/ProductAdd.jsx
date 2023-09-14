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
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/store/slice/index.slice";

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

ProductAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function ProductAdd({ openDia, onCloseDia }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (openDia) {
      onCloseDia;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const isLoading = useSelector((state) => state.index.isLoading);

  const [Product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    status: "false",
  });

  const [Image, setImage] = useState(null);

  var ProductFormData = new FormData();
  ProductFormData.append("name", Product.name);
  ProductFormData.append("description", Product.description);
  ProductFormData.append("category", Product.category);
  ProductFormData.append("p_image", Product.image);
  ProductFormData.append("status", Product.status);

  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/product");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <div className="ContainerLoader">
          <span className="loader"></span>
        </div>
      ) : (
        <Dialog open={openDia} onClose={onCloseDia}>
          <DialogTitle>Add Product</DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Product Name"
                required
                size="20"
                maxLength="20"
                onChange={(e) =>
                  setProduct({ ...Product, name: e.target.value })
                }
              />
              <TextField
                name="description"
                label="Product Description"
                required
                size="20"
                maxLength="20"
                onChange={(e) =>
                  setProduct({ ...Product, description: e.target.value })
                }
              />
              <TextField
                name="category"
                label="Product Category"
                required
                size="20"
                maxLength="20"
                onChange={(e) =>
                  setProduct({ ...Product, category: e.target.value })
                }
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
                  onChange={(e) => {
                    setProduct({ ...Product, image: e.target.files[0] });

                    setImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </Button>

              {Image && (
                <div>
                  <h3>Selected Image:</h3>
                  <img src={Image} alt="Selected" />
                </div>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                dispatch(addProduct({ data: ProductFormData }));
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
