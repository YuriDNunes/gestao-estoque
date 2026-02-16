import styles from "./button.module.css";

const Button = ({ text, type }) => {
  return (
    <button type={type} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
