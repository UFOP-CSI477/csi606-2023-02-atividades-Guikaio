import React, { useState } from "react";
import "./styles.css";
import FormBanda from "../FormBanda";
import useBandas from "../../../../hooks/useBandas";

export default function BandaCard({ banda }) {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteBanda, updateBanda } = useBandas();

  const handleDelete = async (id) => {
    try {
      await deleteBanda(id);
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditar = async (newBanda) => {
    newBanda._id = banda._id
    try {
      await updateBanda(banda._id, newBanda);
      setIsEdit(!isEdit)
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    console.log("Cancel clicked");
    setIsEdit(false);
  };

  return (
    <>
      {!isEdit ? (
        <div className="banda-card">
          <div className="banda-info">{banda.nome}</div>
          <div className="banda-buttons">
            <button
              className="excluir-btn"
              onClick={() => handleDelete(banda._id)}
            >
              Excluir
            </button>
            <button className="editar-btn" onClick={() => setIsEdit(!isEdit)}>
              Editar
            </button>
          </div>
        </div>
      ) : (
        <FormBanda banda={banda} onCancelEdit={handleCancelEdit} onSave={handleEditar}/>
      )}
    </>
  );
}
