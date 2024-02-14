"use client";
import React, { useEffect, useState } from "react";
import { buscaLocalColetaPorId } from "../../services/localColetaService";
import { useNavigate, useParams } from "react-router-dom";
import useLocaisColeta from "../../hooks/useLocaisColeta";
import FormularioLocalColeta from "../../components/FormularioLocalColeta";
import styles from "./styles.module.css";

export default function LocalColeta() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localColeta, setLocalColeta] = useState(null);
  const [editLocalColetaForm, setEditLocalColetaForm] = useState(false);
  const { updateLocalColeta, deleteLocalColeta } = useLocaisColeta();

  const navigation = useNavigate();
  const params = useParams();

  const handleEdit = () => {
    setEditLocalColetaForm(true);
  };

  useEffect(() => {
    const fetchLocalColeta = async () => {
      try {
        const data = await buscaLocalColetaPorId(params.id);
        setLocalColeta(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLocalColeta();
  }, [params.id]);

  const handleSubmit = async (e, formValues) => {
    e.preventDefault();
    const requiredFields = ["nome", "rua", "cidade", "numero"];
    const isValid = requiredFields.every(
      (field) => formValues[field] !== null && formValues[field] !== ""
    );

    if (isValid) {
      await updateLocalColeta(params.id, formValues);
      setEditLocalColetaForm(!editLocalColetaForm);
      window.location.reload();
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  const handleDelete = async () => {
    await deleteLocalColeta(params.id);
    navigation("/locaiscoleta");
  };

  if (loading) {
    return (
      <div className="mt-14">
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-14">
        <h1>Ocorreu um erro ao carregar os detalhes do local de coleta.</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (editLocalColetaForm) {
    return (
      <FormularioLocalColeta
        isEdit={true}
        handleSubmit={handleSubmit}
        handleCancel={() => {
          setEditLocalColetaForm(false);
        }}
        localColeta={localColeta}
      />
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div>
          <div>
            <h2 className={styles.title}>{localColeta.nome}</h2>
          </div>
          <div className={styles.locationInfo}>
            <h2 className="text-xl font-bold mb-2">
              Informações do local de coleta
            </h2>
            <p>Cidade: {localColeta.cidade.nome}</p>
            <p>Rua: {localColeta.rua}</p>
            <p>Numero: {localColeta.numero}</p>
            <p>Complemento: {localColeta.complemento}</p>
          </div>
        </div>
        <div>
          <button
            className={styles.editButton}
            onClick={() => handleEdit()}
          >
            Editar
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete()}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
