import React from "react";
import styles from "./styles.module.css";

export default function InputText({
  label,
  placeholder = "",
  type = "text",
  value = "",
  ...props
}) {
  return (
    <div className={styles.inputTextContainer}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className={styles.inputTextLabel}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        value={value}
        className={styles.inputText}
      />
    </div>
  );
}
