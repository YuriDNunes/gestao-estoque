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

const Managers = () => {
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
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          Novo gestor
        </Button>
      </Box>

      <Divider sx={{ my: 2.5 }} />

      <TableContainer component={Paper} sx={{ pt: 1, pb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registro</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Acesso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>G001</TableCell>
              <TableCell>Ana Souza</TableCell>
              <TableCell>ana@empresa.com</TableCell>
              <TableCell>Gestor</TableCell>
              <TableCell>
                <Chip label="Liberado" color="success" size="small" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>G002</TableCell>
              <TableCell>João Carlos</TableCell>
              <TableCell>joao@empresa.com</TableCell>
              <TableCell>Gestor</TableCell>
              <TableCell>
                <Chip label="Liberado" color="success" size="small" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>G003</TableCell>
              <TableCell>Zé Alexandre</TableCell>
              <TableCell>ze@empresa.com</TableCell>
              <TableCell>Gestor</TableCell>
              <TableCell>
                <Chip label="Bloqueado" color="error" size="small" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Managers;
