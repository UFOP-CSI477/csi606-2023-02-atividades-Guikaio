import React from "react";
import styles from "./styles.module.css";

export default function InputData({ label, placeholder, ...props }) {
  return (
    <div className={styles.inputDateContainer}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className={styles.inputDateLabel}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        type="date"
        placeholder={placeholder}
        className={styles.inputDate}
      />
    </div>
  );
}
