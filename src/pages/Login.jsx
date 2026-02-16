import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    navigate("/admin/dashboard");
  }

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h1 className={styles.title}>Storage system</h1>
      </header>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="admin@email.com"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="*********"
            minLength={6}
            required
            className={styles.input}
          />
        </div>
        <Button text="Enviar" type="submit" />
      </form>
      <footer className={styles.footer}>
        <a href="#">Forgot your password?</a>
      </footer>
    </div>
  );
};

export default Login;
