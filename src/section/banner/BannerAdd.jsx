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
import { addBanner } from "../../redux/store/slice/index.slice";
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

BannerAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function BannerAdd({ openDia, onCloseDia }) {
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

  const [Banner, setBanner] = useState({
    image: "",
    status: "false",
  });

  const [Image, setImage] = useState(null);

  var BannerFormData = new FormData();

  BannerFormData.append("b_image", Banner.image);
  BannerFormData.append("status", Banner.status);

  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/banner");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Dialog open={openDia} onClose={onCloseDia}>
          <DialogTitle>Add Banner</DialogTitle>

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
                    setBanner({ ...Banner, image: e.target.files[0] });

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
                dispatch(addBanner({ data: BannerFormData }));
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
