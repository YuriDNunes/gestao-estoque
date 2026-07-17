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
  const initialFormState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialFormState);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },

        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        setEmailError(true);
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();

      localStorage.setItem("meu_token_jwt", data.accessToken);

      navigate("/admin/dashboard");
    } catch (e) {
      console.error("Erro no login: ", e);
    }
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
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
