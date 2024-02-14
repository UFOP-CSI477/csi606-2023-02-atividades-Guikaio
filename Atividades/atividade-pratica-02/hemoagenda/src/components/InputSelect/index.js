import React from "react";
import styles from "./styles.module.css";

export default function InputSelect({
  label,
  options,
  optionSelected = "",
  optionViewName = "nome",
  ...props
}) {
  return (
    <div className={styles.inputSelectContainer}>
      {label && (
        <label
          htmlFor={props.id || props.nome}
          className={styles.inputSelectLabel}
        >
          {label}
        </label>
      )}
      <select
        {...props}
        defaultValue={optionSelected}
        className={styles.inputSelect}
      >
        <option value="" disabled name="default">
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option
            key={option._id}
            value={option._id}
            name={option[optionViewName]}
          >
            {option[optionViewName]}
          </option>
        ))}
      </select>
    </div>
  );
}
