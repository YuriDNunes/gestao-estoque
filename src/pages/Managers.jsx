import Form from "../components/Form";
import styles from "./Manager.module.css";

const Managers = () => {
  return (
    <div className={styles.Manager}>
      <div className={styles.formCard}>
        <Form />
      </div>
      <div className={styles.list}>
        <div className={styles.container}>
          <p>id / nome / email / num_id / role / acesso</p>
          <p>id / nome / email / num_id / role / acesso</p>
          <p>id / nome / email / num_id / role / acesso</p>
        </div>
      </div>
    </div>
  );
};

export default Managers;
