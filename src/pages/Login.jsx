import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    navigate("/admin/dashboard");
  }

  // funçoes para botao de visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 400 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" color="text.primary">
            Storage system
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            required
            type="email"
            id="standard-basic"
            label="Email"
            variant="standard"
            error={emailError}
            helperText={emailError ? "Por favor insira um e-mail válido" : ""}
          />
          <TextField
            required
            label="Senha"
            type={showPassword ? "text" : "password"}
            variant="standard"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            Entrar
          </Button>
        </Box>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link href="#" variant="body2" underline="hover">
            Esqueceu a senha?
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
