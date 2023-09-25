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
import { useNavigate } from "react-router-dom";
import { addNews } from "../../redux/store/slice/index.slice";
import { DatePicker } from "@mui/x-date-pickers";
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

NewsAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function NewsAdd({ openDia, onCloseDia }) {
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

  const [News, setNews] = useState({
    name: "",
    description: "",
    p_date: "",
    image: "",
    status: "false",
  });

  const [Image, setImage] = useState(null);

  var NewsFormData = new FormData();
  NewsFormData.append("name", News.name);
  NewsFormData.append("description", News.description);
  NewsFormData.append("p_date", News.p_date);
  NewsFormData.append("n_image", News.image);
  NewsFormData.append("status", News.status);

  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/news");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Dialog open={openDia} onClose={onCloseDia}>
          <DialogTitle>Add News</DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="News Name"
                required
                size="20"
                maxLength="20"
                onChange={(e) => setNews({ ...News, name: e.target.value })}
              />
              <TextField
                name="description"
                label="News Description"
                required
                size="20"
                maxLength="20"
                onChange={(e) =>
                  setNews({ ...News, description: e.target.value })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DemoItem>
                    <DatePicker
                      label="News Date"
                      required
                      onChange={(value) =>
                        setNews({ ...News, p_date: value.format("YYYY-MM-DD") })
                      }
                      defaultValue={dayjs("2023-09-17")}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
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
                    setNews({ ...News, image: e.target.files[0] });
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
                dispatch(addNews({ data: NewsFormData }));
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
