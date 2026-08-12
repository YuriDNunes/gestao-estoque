import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e3a5f",
      light: "#3a5f8a",
      dark: "#0f233a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0ea5e9",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      letterSpacing: "-0.02em",
      color: "#0f172a",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.03)", // Sombra elegante e discreta
          border: "1px solid #e2e8f0",
          borderRadius: "12px", // Arredonda o card inteiro da tabela
          overflow: "hidden", // Garencia para que as linhas internas não Passem da borda
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          marginTop: "8px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #f1f5f9",
          padding: "16px 24px",
        },
        head: {
          fontWeight: 600,
          color: "#475569", // Texto um pouco mais escuro para contraste perfeito
          backgroundColor: "#f8fafc", // Fundo cinza super suave separando o topo
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          padding: "8px",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        "& fieldset": {
          borderColor: "#cbd5e1", // Borda cinza suave padrão
        },
        "&:hover fieldset": {
          borderColor: "#94a3b8", // Borda mais escura no hover
        },
      },
    },
  },
});

export default theme;
