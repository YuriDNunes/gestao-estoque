import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
