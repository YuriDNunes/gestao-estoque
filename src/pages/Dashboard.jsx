import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <div className={styles.container}>
        <div className={styles.card}>1</div>
        <div className={styles.card}>2</div>
        <div className={styles.card}>3</div>
      </div>
    </div>
  );
};

export default Dashboard;
