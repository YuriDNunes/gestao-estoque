import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllocatedProducts } from "../services/AllocationServices";
import ReturnAllocationDialog from "../components/ReturnAllocationDialog";

const MyAllocations = () => {
  const [allocationsList, setALlocationsList] = useState([]);

  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  const fetchAllocatedProducts = async () => {
    try {
      const response = await getAllocatedProducts();
      setALlocationsList(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllocatedProducts();
  }, []);

  const handleOpenReturnDialog = (product) => {
    setSelectedAllocation(product);
    setOpenReturnDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="text.primary">
          Meus produtos
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Produto
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Quantidade
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Data alocado
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allocationsList.map((product) => (
              <TableRow key={product.id}>
                <TableCell sx={{ fontSize: 18 }}>
                  {product.productName}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }}>
                  {product.productQuantity}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }}>
                  {new Date(product.allocateDate).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenReturnDialog(product)}
                  >
                    Devolver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReturnAllocationDialog
        open={openReturnDialog}
        onClose={() => setOpenReturnDialog(false)}
        allocation={selectedAllocation}
        onSuccess={fetchAllocatedProducts}
      />
    </Box>
  );
};

export default MyAllocations;
