import styles from "./Form.module.css";
import Button from "../components/Button";

const Form = () => {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="managerName" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="managerEmail" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="numId">Registro:</label>
            <input type="text" id="managerNumId" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="role">Cargo:</label>
            <input type="text" id="managerRole" className={styles.input} />
          </div>
          <Button text="Cadastrar" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Form;
