import React, { useState } from "react";
import InputForm from "../../../../components/InputForm";
import "./styles.css";

export default function FormBanda({
  banda = {},
  onCancelEdit = undefined,
  onSave,
}) {
  const [nome, setNome] = useState(banda.nome || "");

  const handleSave = (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert(
        "O campo Nome da Banda é obrigatório e não pode conter apenas espaços."
      );
      return;
    }

    const newBanda = {
      nome: nome,
    };
    onSave(newBanda);
    if (banda._id) {
    } else {
      setNome("");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancelEdit();
  };

  return (
    <form className="form-banda">
      <InputForm
        type="text"
        placeholder="Nome da banda"
        name="banda"
        onChange={(e) => setNome(e.target.value)}
        value={nome}
      />
      {!banda._id && (
        <button
          className="salvar-btn"
          type="submit"
          onClick={(e) => handleSave(e)}
        >
          Adicionar
        </button>
      )}
      {banda._id && (
        <>
          <button
            className="salvar-btn"
            type="submit"
            onClick={(e) => handleSave(e)}
          >
            Salvar
          </button>
          <button
            className="cancelar-btn"
            type="button"
            onClick={(e) => handleCancel(e)}
          >
            Cancelar
          </button>
        </>
      )}
    </form>
  );
}
