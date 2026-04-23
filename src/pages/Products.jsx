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
import { useEffect, useState } from "react";
import { createProduct } from "../services/ProductServices";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { fetchProducts } from "../services/ProductServices";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const initialFormState = { code: "", name: "", quantity: 1 };
  const [formData, setFormData] = useState(initialFormState);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    postProduct();
  };

  async function postProduct() {
    try {
      await createProduct(formData);
      setFormData(initialFormState);
      handleClose();

      setSnackbar({
        open: true,
        message: "Produto criado com sucesso",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Falha ao criar produto",
        severity: "error",
      });
      console.error(error.message);
    }
  }

  async function getProducts() {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
      setSnackbar({
        open: true,
        message: "Erro ao carregar lista de usuários",
        severity: "error",
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getProducts();
  }, []);

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
          <form onSubmit={handleSubmit} id="product-form">
            <TextField
              autoFocus
              required
              id="code"
              name="code"
              label="Código do produto"
              type="text"
              variant="standard"
              fullWidth
              value={formData.code}
              onChange={handleChange}
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.quantity}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" form="product-form">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ my: 2.5 }} />

      <TableContainer component={Paper} sx={{ pt: 1, pb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Código
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Nome
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Quantidade
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell sx={{ fontSize: 18 }}>{product.code}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{product.name}</TableCell>
                <TableCell sx={{ fontSize: 18 }}>{product.quantity}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Products;
