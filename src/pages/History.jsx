import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import { useEffect, useState } from "react";
import { getHistory } from "../services/HistoryServices";

const History = () => {
  const [history, setHistory] = useState([]);

  const allocationCount = history.filter(
    (item) => item.actionName !== "RETURN",
  ).length;
  const returnCount = history.filter(
    (item) => item.actionName === "RETURN",
  ).length;
  const totalQuantity = history.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

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
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1500, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h3" color="text.primary">
            Histórico de movimentação
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Acompanhe as entradas e saídas de produtos do estoque.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2.5 }} />

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 290px)", overflowX: "auto" }}
      >
        <Table stickyHeader sx={{ minWidth: 760 }}>
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
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 8, textAlign: "center" }}>
                  <Typography color="text.secondary">
                    Nenhuma movimentação registrada.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              history.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{
                    "&:hover": { bgcolor: "#f8fbfd" },
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Date(data.dateAction).toLocaleDateString("pt-BR")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(data.dateAction).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <PersonCell name={data.managerName} />
                  </TableCell>
                  <TableCell>
                    <PersonCell name={data.targetUserName} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        data.actionName === "RETURN" ? "Devolução" : "Alocação"
                      }
                      color={data.actionName === "RETURN" ? "success" : "info"}
                      size="small"
                      sx={{ fontWeight: 600, minWidth: 82 }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {data.productName}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {data.quantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const SummaryCard = ({ icon, label, value, color }) => (
  <Paper
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      p: 2,
      borderRadius: 2,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <Avatar sx={{ bgcolor: `${color}18`, color, width: 42, height: 42 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
        {value}
      </Typography>
    </Box>
  </Paper>
);

const PersonCell = ({ name }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Avatar
      sx={{
        width: 28,
        height: 28,
        fontSize: "0.75rem",
        bgcolor: "#e8f1f8",
        color: "primary.dark",
      }}
    >
      {name?.charAt(0)?.toUpperCase() || "-"}
    </Avatar>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {name || "-"}
    </Typography>
  </Stack>
);

export default History;
