import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import IconButton from "@mui/material/IconButton";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { getUserRole, logout } from "../utils/auth";

export const DRAWER_WIDTH = 180;
export const DRAWER_WIDTH_CLOSED = 65;

const SideBar = ({ open, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = getUserRole();

  const isAdmin = role === "ROLE_Admin";
  const isManagerOrAdmin = role === "ROLE_Manager" || role === "ROLE_Admin";
  const isStandardUser = role === "ROLE_User";

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED,
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED,
          overflowX: "hidden",
          transition: "width 0.4s ease",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ width: open ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: open ? "flex-end" : "flex-start",
            p: 1,
          }}
        >
          <IconButton onClick={onToggle}>
            {open ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
          </IconButton>
        </Box>
        <List>
          {isManagerOrAdmin && (
            <ListItemButton
              selected={location.pathname === "/admin/dashboard"}
              onClick={() => navigate("/admin/dashboard")}
            >
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          )}
          {isAdmin && (
            <ListItemButton
              selected={location.pathname === "/admin/managers"}
              onClick={() => navigate("/admin/managers")}
            >
              <ListItemIcon>
                <PeopleAltRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Gestores" />
            </ListItemButton>
          )}
          {isManagerOrAdmin && (
            <ListItemButton
              selected={location.pathname === "/admin/users"}
              onClick={() => navigate("/admin/users")}
            >
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Usuários" />
            </ListItemButton>
          )}
          {isManagerOrAdmin && (
            <ListItemButton
              selected={location.pathname === "/admin/products"}
              onClick={() => navigate("/admin/products")}
            >
              <ListItemIcon>
                <Inventory2RoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Produtos" />
            </ListItemButton>
          )}
          {isStandardUser && (
            <ListItemButton
              selected={location.pathname === "/my-products"}
              onClick={() => navigate("/my-products")}
            >
              <ListItemIcon>
                <ContentPasteRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Alocações" />
            </ListItemButton>
          )}
        </List>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <List>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
