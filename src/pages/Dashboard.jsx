import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <Grid container spacing={2} margin={3}>
      <Grid item size={4}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Gestor
              </Typography>
              <Typography variant="h3">4</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item size={4}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Usuarios
              </Typography>
              <Typography variant="h3">4</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item size={4}>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Produtos
              </Typography>
              <Typography variant="h3">4</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item size={12}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Registros do mês
              </Typography>
              <Typography variant="h3">12</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
