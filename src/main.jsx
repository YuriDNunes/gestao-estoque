import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import AuthLayout from "./layouts/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Managers from "./pages/Managers.jsx";
import Users from "./pages/Users.jsx";
import Products from "./pages/Products.jsx";
import theme from "./theme/index.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyAllocations from "./pages/MyAllocations.jsx";
import History from "./pages/History.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["ROLE_Admin", "ROLE_Manager"]} />
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "managers",
            element: <Managers />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "history",
            element: <History />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["ROLE_User"]} />,
        children: [
          {
            path: "my-products",
            element: <MyAllocations />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
