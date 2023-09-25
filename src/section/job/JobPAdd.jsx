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
import { useNavigate } from "react-router-dom";
import { addJobP } from "../../redux/store/slice/index.slice";
import Loading from "../../components/Loader/Loading";

// ----------------------------------------------------------------------

JobPAdd.propTypes = {
  openDia: PropTypes.bool,
  onCloseDia: PropTypes.func,
};

export default function JobPAdd({ openDia, onCloseDia }) {
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

  const [JobP, setJobP] = useState({
    image: "",
    status: "false",
  });

  var BannerFormData = new FormData();

  BannerFormData.append("name", JobP.name);
  BannerFormData.append("status", JobP.status);

  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/job");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Dialog open={openDia} onClose={onCloseDia}>
          <DialogTitle>Add Job Position</DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Job Name"
                required
                size="20"
                maxLength="20"
                onChange={(e) => setJobP({ ...JobP, name: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                dispatch(addJobP({ data: BannerFormData }));
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
