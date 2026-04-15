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
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createManagers,
  deleteManager,
  fetchManagers,
  updateManager,
} from "../services/ManagerServices";

const Managers = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [managers, setManagers] = useState([]);
  const initialFormState = { register: "", name: "", email: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [selectedManager, setSelectedManager] = useState(null);
  const [managerToDelete, setManagerToDelete] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreateClick = () => {
    if (selectedManager) {
      setFormData(initialFormState);
      setSelectedManager(null);
    }
    handleOpen();
  };

  const handleClose = () => {
    setOpen(false);
  };

  //função para capturar o gerente que vai ser editado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //função para o botao de edição e para o gerente ser guardado
  const handleEditClick = (manager) => {
    setSelectedManager(manager);
    setFormData({
      register: manager.register,
      name: manager.name,
      email: manager.email,
    });
    handleOpen();
  };

  const handleDeleteClick = (manager) => {
    setManagerToDelete(manager);

    setOpenDeleteDialog(true);
  };

  //função para o form ser submetido
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedManager) {
      postUser();
    } else {
      putUser();
    }
  };

  //função para criar um usuário
  async function postUser() {
    try {
      await createManagers(formData);
      setFormData(initialFormState);
      handleClose();
      getUsers();
    } catch (error) {
      console.error(error.message);
    }
  }

  //função para atualizar um usuário
  async function putUser() {
    try {
      await updateManager(selectedManager.id, formData);
      setFormData(initialFormState);
      handleClose();
      getUsers();
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteUser() {
    try {
      await deleteManager(managerToDelete.id);
      setManagerToDelete(null);
      setOpenDeleteDialog(false);
      getUsers();
    } catch (error) {
      console.error(error.message);
    }
  }

  //Função para listar os usuários
  async function getUsers() {
    const url = "http://localhost:8080/api/user?role=Gestor";

    try {
      const data = await fetchManagers();

      setManagers(data);
    } catch (error) {
      console.error(error.message);
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
          Gestores
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
        <DialogTitle>Cadastre um novo gestor</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="manager-form">
            <TextField
              autoFocus
              required
              id="register"
              name="register"
              label="Registro do funcionário"
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
              label="Nome do funcionário"
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
              label="E-mail do funcionário"
              type="email"
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
          <Button variant="contained" type="submit" form="manager-form">
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
                Acesso
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell sx={{ fontSize: 18 }}>{manager.register}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{manager.name}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{manager.email}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{manager.role}</TableCell>
                <TableCell>
                  <Chip
                    label={manager.access ? "Liberado" : "Bloqueado"}
                    color={manager.access ? "success" : "error"}
                    size="small"
                    sx={{ fontSize: 16, p: 1.5 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(manager)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteClick(manager)}
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
            Tem certeza que deseja deletar o gestor{" "}
            <b>{managerToDelete?.name}</b>?
          </Typography>
          Essa ação não pode ser revertida.
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDeleteDialog(false);
              setManagerToDelete(null);
            }}
          >
            Cancelar
          </Button>
          // TODO: Adicionar onClick para deletar usuário
          <Button color="error" variant="contained">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Managers;
