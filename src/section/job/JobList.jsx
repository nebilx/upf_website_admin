import { useState } from "react";
import { filter } from "lodash";
import PropTypes from "prop-types";

// @mui
import {
  Card,
  Table,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Iconify from "../../components/iconify/Iconify";
import Scrollbar from "../../components/scrollbar/Scrollbar";
// sections
import ListHead from "../list/ListHead";
import ListToolbar from "../list/ListToolbar";

import { deleteJob } from "../../redux/store/slice/index.slice";

import { useDispatch } from "react-redux";

const TABLE_HEAD = [
  { id: "" },
  { id: "fullName", label: "Name", alignRight: false },
  { id: "phoneNumber", label: "PNo", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "yearOfExperience", label: "Experience", alignRight: false },
  { id: "jobPosition", label: "Job", alignRight: false },
  { id: "cvFileName", label: "CV", alignRight: false },
  { id: "driveFileId", label: "Document", alignRight: false },
  { id: "uploadDate", label: "Upload Date", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.jobPosition.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function JobList({ job }) {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("fullName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedId, setSelectedId] = useState("");

  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    handleCloseMenu();
  };

  const handleDeleteConfirmation = (_id) => {
    if (_id && selectedId) {
      var DeleteFormData = new FormData();
      DeleteFormData.append("id", _id);
      handleDeleteDialogClose();
      dispatch(deleteJob({ data: DeleteFormData }));
      setSelected([]);
      setSelectedId(null);
    } else {
      setShowDialog(true);
      handleDeleteDialogClose();
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = job.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, _id) => {
  //   const selectedIndex = selected.indexOf(_id);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, _id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  //   setSelectedId(_id); // Set the selected `_id`
  // };

  const handleClick = (event, _id) => {
    if (selectedId === _id) {
      setSelected([]);
      setSelectedId(null);
    } else {
      setSelected([_id]);
      setSelectedId(_id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - job.length) : 0;

  const filteredUsers = applySortFilter(
    job,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const openPDFViewer = (fileId) => {
    if (fileId) {
      const url = `https://drive.google.com/file/d/${fileId}/preview`;
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Career
        </Typography>

        <Card sx={{}}>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholderName="Search Job Position ..."
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, padding: "10px" }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={job.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        fullName,
                        phoneNumber,
                        email,
                        yearOfExperience,
                        jobPosition,
                        cvFileName,
                        driveFileId,
                        uploadDate,
                      } = row;
                      const selectedUser = selected.indexOf(fullName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell align="left">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => handleClick(event, _id)} // Pass _id as parameter
                            >
                              <Iconify icon={"icon-park-outline:checkbox"} />
                            </IconButton>
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            {fullName}
                          </TableCell>

                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{yearOfExperience}</TableCell>
                          <TableCell align="left">{jobPosition}</TableCell>
                          <TableCell align="left">{cvFileName}</TableCell>
                          <TableCell align="left">
                            <IconButton
                              aria-label="View"
                              onClick={() => openPDFViewer(driveFileId)}
                            >
                              <Iconify icon={"carbon:view"} />
                            </IconButton>
                          </TableCell>
                          <TableCell align="left">
                            {uploadDate.split("T")[0]}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenu}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={job.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

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
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>No</Button>
          <Button onClick={() => handleDeleteConfirmation(selectedId)}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a checkbox before proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

JobList.propTypes = {
  job: PropTypes.array.isRequired,
};
