import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/UserServices";
import { fetchProducts } from "../services/ProductServices";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { allocateProduct } from "../services/AllocationServices";

const ProductAllocationDialog = ({ open, onClose, onSuccess, onError }) => {
  const [usersList, setUsersList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const selectedProductObj = productsList.find(
    (p) => p.id === selectedProductId,
  );

  const handleAllocate = async () => {
    try {
      await allocateProduct({
        targetUserId: Number(selectedUserId),
        productId: Number(selectedProductId),
        quantity: Number(quantity),
      });

      onSuccess();
      setSelectedUserId("");
      setSelectedProductId("");
      setQuantity(0);
      onClose();
    } catch (e) {
      onError(e.message);
    }
  };

  useEffect(() => {
    if (open) {
      const loadData = async () => {
        try {
          const responseUser = await fetchUsers();
          const responseProduct = await fetchProducts();

          setUsersList(responseUser);
          setProductsList(responseProduct);
        } catch (e) {
          console.error(e);
        }
      };
      loadData();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Aloque um produto a um usuário</DialogTitle>
      <DialogContent>
        <InputLabel id="user-select-label">Usuário</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUserId}
          label="Usuário"
          fullWidth
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {usersList.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="user-select-label">Produto</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          value={selectedProductId}
          label="Produto"
          fullWidth
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          {productsList.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          required
          label={
            selectedProductObj
              ? `Disponível (${selectedProductObj.name}): ${selectedProductObj.quantity}`
              : "Quantidade"
          }
          type="number"
          variant="standard"
          value={quantity}
          fullWidth
          onChange={(e) => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="outlined" onClick={() => onClose(false)}>
          Cancelar
        </Button>
        <Button color="success" variant="contained" onClick={handleAllocate}>
          Alocar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductAllocationDialog;
