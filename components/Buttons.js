import styles from "@styles/components/Buttons.module.scss";

function FilledButton({ onClick, fullWidth, children, ...props }) {
  return (
    <button
      className={`${styles.button__filled} ${
        fullWidth ? styles.button__fullwidth : null
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

function UnfilledButton({ onClick, fullWidth, children, ...props }) {
  return (
    <button
      className={`${styles.button__unfilled} ${
        fullWidth ? styles.button__fullwidth : null
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export { FilledButton, UnfilledButton };
