import React from "react";

export default function InputForm({
  type,
  placeholder,
  name,
  onChange,
  value = undefined,
}) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
}
