import styles from "@styles/components/Inputs.module.scss";

function TextInput({ type, value, onChange, onEnter, fullWidth, ...props }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onEnter();
  };

  return (
    <input
      className={`${styles.input__text} ${
        fullWidth ? styles.input__fullwidth : null
      }`}
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onEnter ? handleKeyPress : null}
      {...props}
    />
  );
}

export { TextInput };
