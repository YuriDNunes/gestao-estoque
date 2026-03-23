import { Outlet } from "react-router-dom";
import SideBar, {
  DRAWER_WIDTH,
  DRAWER_WIDTH_CLOSED,
} from "../components/SideBar";
import { useState } from "react";
import Box from "@mui/material/Box";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box>
      <SideBar open={open} onToggle={() => setOpen(!open)} />
      <Box
        sx={{
          ml: open ? `${DRAWER_WIDTH}px` : `${DRAWER_WIDTH_CLOSED}px`,
          transition: "margin 0.4s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
