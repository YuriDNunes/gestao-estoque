import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const AdminLayout = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
