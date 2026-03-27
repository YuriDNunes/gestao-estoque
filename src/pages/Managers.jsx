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
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";

const Managers = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.PreventDefault();
  };

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
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>G001</TableCell>
              <TableCell sx={{ fontSize: 18 }}>Ana Souza</TableCell>
              <TableCell sx={{ fontSize: 18 }}>ana@empresa.com</TableCell>
              <TableCell sx={{ fontSize: 18 }}>Gestor</TableCell>
              <TableCell>
                <Chip
                  label="Liberado"
                  color="success"
                  size="small"
                  sx={{ fontSize: 16, p: 1.5 }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>G002</TableCell>
              <TableCell sx={{ fontSize: 18 }}>João Carlos</TableCell>
              <TableCell sx={{ fontSize: 18 }}>joao@empresa.com</TableCell>
              <TableCell sx={{ fontSize: 18 }}>Gestor</TableCell>
              <TableCell>
                <Chip
                  label="Liberado"
                  color="success"
                  size="small"
                  sx={{ fontSize: 16, p: 1.5 }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>G003</TableCell>
              <TableCell sx={{ fontSize: 18 }}>Zé Alexandre</TableCell>
              <TableCell sx={{ fontSize: 18 }}>ze@empresa.com</TableCell>
              <TableCell sx={{ fontSize: 18 }}>Gestor</TableCell>
              <TableCell>
                <Chip
                  label="Bloqueado"
                  color="error"
                  size="small"
                  sx={{ fontSize: 16, p: 1.5 }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Managers;
