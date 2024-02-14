import React from "react";

export default function TextAreaForm({
  row,
  placeholder,
  name,
  onChange,
  value,
}) {
  return (
    <textarea
      value={value}
      rows={row}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
}
