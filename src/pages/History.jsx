import {
  Box,
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getHistory } from "../services/HistoryServices";

const History = () => {
  const [history, setHistory] = useState([]);

  async function fetchHistory() {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>Histórico de movimentação</Box>

      <Divider sx={{ my: 2.5 }} />

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "85vh", textJustify: "center" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Data</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Responsável (Gestor)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Destinatário (Usuário)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ação</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Produto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  {new Date(data.dateAction).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>{data.managerName}</TableCell>
                <TableCell>{data.targetUserName}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      data.actionName === "RETURN" ? "Devolução" : "Alocação"
                    }
                    color={data.actionName === "RETURN" ? "success" : "info"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{data.productName}</TableCell>
                <TableCell>{data.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default History;
