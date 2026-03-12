import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";
import Box from "@mui/material/Box";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box>
      <SideBar open={open} onToggle={() => setOpen(!open)} />
      <Box
        sx={{
          ml: open ? "3rem" : "-6rem",
          transition: "margin 0.2s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
