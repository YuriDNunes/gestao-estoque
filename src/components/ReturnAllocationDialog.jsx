import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { returnAllocatedProduct } from "../services/AllocationServices";

const ReturnAllocationDialog = ({
  open,
  onClose,
  allocation,
  onSuccess,
  onError,
}) => {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (open) {
      setQuantity("");
    }
  }, [open]);

  const handleReturn = async () => {
    const quantityToReturn = Number(quantity);

    if (!allocation) return;

    if (
      quantityToReturn <= 0 ||
      quantityToReturn > allocation.productQuantity
    ) {
      if (onError) onError("Quantidade inválida.");
      return;
    }

    try {
      await returnAllocatedProduct(allocation.id, quantityToReturn);
      onSuccess();
      onClose();
    } catch (e) {
      if (onError) onError(e.message);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>Devolver Produto</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2, mt: 1 }}>
          Produto: <strong>{allocation?.productName}</strong>
          <br />
          Quantidade em sua posse:{" "}
          <strong>{allocation?.productQuantity}</strong>
        </Typography>

        <form>
          <TextField
            autoFocus
            required
            label="Quantidade a devolver"
            type="number"
            variant="standard"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <Button color="error" variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={handleReturn}
          disabled={
            !quantity ||
            Number(quantity) <= 0 ||
            Number(quantity) > allocation?.productQuantity
          }
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnAllocationDialog;
