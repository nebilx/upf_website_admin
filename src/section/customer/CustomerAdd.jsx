import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../redux/store/slice/index.slice";
import Loading from "../../components/Loader/Loading";

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

CustomerAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function CustomerAdd({ openDia, onCloseDia }) {
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

  const [Customer, setCustomer] = useState({
    image: "",
    status: "false",
  });

  const [Image, setImage] = useState(null);

  var CustomerFormData = new FormData();

  CustomerFormData.append("par_image", Customer.image);
  CustomerFormData.append("status", Customer.status);

  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/customer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Dialog open={openDia} onClose={onCloseDia}>
          <DialogTitle>Add Customer</DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
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
                    setCustomer({ ...Customer, image: e.target.files[0] });

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
                dispatch(addCustomer({ data: CustomerFormData }));
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
