import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const Products = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          Produtos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={handleOpen}
        >
          Novo produto
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastre um novo produto</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              required
              id="code"
              name="code"
              label="Código do produto"
              type="text"
              variant="standard"
              fullWidth
            />
            <TextField
              autoFocus
              required
              id="name"
              name="name"
              label="Informe o nome do produto"
              type="text"
              variant="standard"
              fullWidth
            />
            <TextField
              autoFocus
              required
              id="quantity"
              name="quantity"
              label="Informe a quantidade"
              type="number"
              variant="standard"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained">Cadastrar</Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ my: 2.5 }} />

      <TableContainer component={Paper} sx={{ pt: 1, pb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>P001</TableCell>
              <TableCell>Mouses</TableCell>
              <TableCell>10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P002</TableCell>
              <TableCell>Teclados</TableCell>
              <TableCell>15</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P003</TableCell>
              <TableCell>Monitores</TableCell>
              <TableCell>5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;
