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

const Users = () => {
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
          Usuários
        </Typography>
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          Novo usuário
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>U001</TableCell>
              <TableCell>Maria</TableCell>
              <TableCell>maria@empresa.com</TableCell>
              <TableCell>Usuário</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>U002</TableCell>
              <TableCell>Felipe</TableCell>
              <TableCell>felipe@empresa.com</TableCell>
              <TableCell>Usuário</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>U003</TableCell>
              <TableCell>Jeffin</TableCell>
              <TableCell>jeffin@empresa.com</TableCell>
              <TableCell>Usuário</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
