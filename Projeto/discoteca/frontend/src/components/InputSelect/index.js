import React from "react";

export default function InputSelect({ options, selectedValue, onValueChange }) {
  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.nome}
        </option>
      ))}
    </select>
  );
}
