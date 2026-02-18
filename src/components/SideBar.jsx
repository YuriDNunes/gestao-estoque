import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink;

  return (
    <div className={styles.SideBar}>
      <nav className={styles.nav}>
        <NavLink to="/admin/dashboard" className={getLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/managers" className={getLinkClass}>
          Managers
        </NavLink>
        <NavLink to="/admin/users" className={getLinkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/products" className={getLinkClass}>
          Products
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
