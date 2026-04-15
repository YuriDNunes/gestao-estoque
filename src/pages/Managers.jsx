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

const Managers = () => {
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [register, setRegister] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",

        body: JSON.stringify({
          name: name,
          email: email,
          register: register,
          password: password,
          access: true,
          role: "Gestor",
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setRegister("");
        setPassword("");

        handleClose();
        getUsers();
      } else {
        console.error("Erro ao cadastrar");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  async function getUsers() {
    const url = "http://localhost:8080/api/user?role=Gestor";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      setManagers(result);
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
          onClick={handleOpen}
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
              value={register}
              onChange={(e) => setRegister(e.target.value)}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              required
              id="password"
              name="password"
              label="Senha para acesso do funcionário"
              type="text"
              variant="standard"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  <EditIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Managers;
