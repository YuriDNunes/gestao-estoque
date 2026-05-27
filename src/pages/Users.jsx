import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../services/UserServices";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Users = () => {
  // state for the dialog
  const [open, setOpen] = useState(false);
  // state for the confirm delete dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // array to save and show the users
  const [users, setUsers] = useState([]);
  // initial state of the form
  const initialFormState = { register: "", name: "", email: "" };
  // data from the form
  const [formData, setFormData] = useState(initialFormState);
  // user that is gonna be edited
  const [selectedUser, setSelectedUser] = useState(null);
  // user that is gonna be deleted
  const [userToDelete, setUserToDelete] = useState(null);
  // sanckbar for feedbacks
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // function to open the dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreateClick = () => {
    if (selectedUser) {
      setFormData(initialFormState);
      setSelectedUser(null);
    }
    handleOpen();
  };

  // function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // function close snack
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // function to catch the user that is gonna be edited
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function to control the submit of the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedUser) {
      postUser();
    } else {
      putUser();
    }
  };

  //function for the button of edition and the user be saved
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      register: user.register,
      name: user.name,
      email: user.email,
    });
    handleOpen();
  };

  // function to save the user that is gonna be deleted
  const handleDeleteClick = (user) => {
    setUserToDelete(user);

    setOpenDeleteDialog(true);
  };

  // load the list of users when is in the page
  useEffect(() => {
    getUsers();
  }, []);

  // function to get the list of users
  async function getUsers() {
    try {
      const data = await fetchUsers();

      setUsers(data);
    } catch (error) {
      console.error(error.status);
    }
  }

  // function to create a user
  async function postUser() {
    try {
      await createUser(formData);
      setFormData(initialFormState);
      handleClose();
      getUsers();

      setSnackbar({
        open: true,
        message: "Usuário criado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error(error.message);
      setSnackbar({
        open: true,
        message: "Erro ao cadastrar usuário. Tente novamente",
        severity: "error",
      });
    }
  }

  //funtion to update a user
  async function putUser() {
    try {
      await updateUser(selectedUser.id, formData);
      setFormData(initialFormState);
      handleClose();
      getUsers();
      setSnackbar({
        open: true,
        message: "Usuário atualizado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error(error.message);
      setSnackbar({
        open: true,
        message: "Erro ao atualizar usuário. Tente novamente",
        severity: "error",
      });
    }
  }

  async function deleteUserHandler() {
    try {
      await deleteUser(userToDelete.id);
      setUserToDelete(null);
      setOpenDeleteDialog(false);
      getUsers();
      setSnackbar({
        open: true,
        message: "Usuário deletado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao deletar usuário. Tente novamente",
        severity: "error",
      });
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="text.primary">
          Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={handleCreateClick}
        >
          Criar
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastre um novo usuário</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="user-form">
            <TextField
              autoFocus
              required
              id="register"
              name="register"
              label="Registro do usuário"
              type="text"
              variant="standard"
              fullWidth
              value={formData.register}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              id="name"
              name="name"
              label="Nome do usuário"
              type="text"
              variant="standard"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              id="email"
              name="email"
              label="Email do usuário"
              type="text"
              variant="standard"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" form="user-form">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ my: 2.5 }} />

      <TableContainer
        component={Paper}
        sx={{ pb: 2, maxHeight: "70vh", textJustify: "center" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Registro
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Nome
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Cargo
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ fontSize: 18 }}>{user.register}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{user.name}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{user.role}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteClick(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja deletar o usuário <b>{userToDelete?.name}</b>
            ?
          </Typography>
          Essa ação não pode ser revertida.
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDeleteDialog(false);
              setUserToDelete(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => deleteUserHandler()}
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
