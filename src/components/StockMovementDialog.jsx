import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { updateProductStock } from "../services/ProductServices";

const StockMovementDialog = ({
  open,
  onClose,
  product,
  onSuccess,
  onError,
}) => {
  const [quantity, setQuantity] = useState(0);

  const handleMovement = async (type) => {
    let numberToMovement = Number(quantity);

    if (type === "withdrawal") {
      numberToMovement = numberToMovement * -1;
    }

    try {
      await updateProductStock(product.id, numberToMovement);

      onSuccess();
      setQuantity(0);
      onClose();
    } catch (e) {
      onError(e.message);
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Retirar/devolver produto</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            required
            label="Quantidade"
            type="text"
            variant="standard"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ m: "auto", pb: "2rem" }}>
        <Button
          color="error"
          variant="contained"
          onClick={() => handleMovement("withdrawal")}
        >
          Retirar
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleMovement("return")}
        >
          Devolver
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockMovementDialog;
