import PropTypes from "prop-types";
// @mui
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  MenuItem,
  Popover,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import Label from "../../components/label/Label";
import Iconify from "../../components/iconify/Iconify";
import { deleteNews, editNews } from "../../redux/store/slice/index.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loaders from "../../components/Loader/loader";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "200px",
  objectFit: "contain",
  position: "absolute",
});

// ----------------------------------------------------------------------

NewsCard.propTypes = {
  dnews: PropTypes.object,
};

export default function NewsCard({ dnews }) {
  const { _id, name, image, description, p_date, status } = dnews;
  const [open, setOpen] = useState(null);

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const isLoading = useSelector((state) => state.index.isLoading);
  const message = useSelector((state) => state.index.message);

  useEffect(() => {
    if (message !== "") navigator("/dashboard/news");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    handleCloseMenu();
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    handleCloseMenu();
  };

  const handleEditConfirmation = (newStatus) => {
    var EditFormData = new FormData();
    EditFormData.append("id", _id);
    EditFormData.append("status", newStatus);
    handleEditDialogClose();
    dispatch(editNews({ data: EditFormData }));
  };

  const handleDeleteConfirmation = () => {
    var DeleteFormData = new FormData();
    DeleteFormData.append("id", _id);
    handleDeleteDialogClose();
    dispatch(deleteNews({ data: DeleteFormData }));
  };

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <Card sx={{ height: "300px", width: "100%" }}>
          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
            <Iconify icon={"eva:more-vertical-fill"} />
          </IconButton>

          <Box sx={{ display: "flex", marginLeft: "20px" }}>
            <Box
              sx={{
                pt: "100%",
                position: "relative",
                width: "400px",
              }}
            >
              {status && (
                <Label
                  variant="filled"
                  color={status === "false" ? "error" : "info"}
                  sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: "absolute",
                    textTransform: "uppercase",
                  }}
                >
                  {status === "true" ? " public" : "Private"}
                </Label>
              )}
              <StyledProductImg alt={name} src={image.url} />
            </Box>

            <Stack spacing={2} sx={{ p: 2 }}>
              <Typography alignSelf="flex-end" variant="h6">
                {p_date}
              </Typography>

              <Link color="inherit" underline="hover">
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Link>

              <Stack
                direction="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle2">{description}</Typography>
              </Stack>
            </Stack>
          </Box>
          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                "& .MuiMenuItem-root": {
                  px: 1,
                  typography: "body2",
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem onClick={handleEditClick}>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
              <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>

          <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Confirmation</DialogTitle>
            <DialogContent>
              Do you want to make it {status === "false" ? "public" : "private"}
              ?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>No</Button>
              <Button
                onClick={() =>
                  handleEditConfirmation(status === "true" ? "false" : "true")
                }
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>Are you sure you want to delete?</DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>No</Button>
              <Button onClick={handleDeleteConfirmation}>Yes</Button>
            </DialogActions>
          </Dialog>
        </Card>
      )}
    </>
  );
}
