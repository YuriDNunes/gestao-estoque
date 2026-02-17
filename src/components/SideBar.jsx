import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.SideBar}>
      <nav className={styles.nav}>
        <NavLink to="dashboard" className={styles.NavLink.active}>
          Dashboard
        </NavLink>
        <NavLink to="managers" className={styles.NavLink}>
          Managers
        </NavLink>
        <NavLink to="users" className={styles.NavLink}>
          Users
        </NavLink>
        <NavLink to="products" className={styles.NavLink}>
          Products
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
