import Form from "../components/Form";
import styles from "./Manager.module.css";

const Managers = () => {
  return (
    <div className={styles.Manager}>
      <div className={styles.formCard}>
        <Form />
      </div>
      <div>Managers list</div>
    </div>
  );
};

export default Managers;
