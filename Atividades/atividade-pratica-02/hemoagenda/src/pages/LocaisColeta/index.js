"use client";
import { React } from "react";
import useLocaisColeta from "../../hooks/useLocaisColeta";
import FormularioLocalColeta from "../../components/FormularioLocalColeta";
import styles from "./styles.module.css";

export default function LocaisColeta() {
  const { listaLocaisColeta, loading, error, adicionarNovoLocalColeta } =
    useLocaisColeta();

  if (loading) {
    return <p> Carregando locais de coleta...</p>;
  }

  if (error) {
    return (
      <p>Ocorreu um erro ao carregar os locais de coleta: {error.message}</p>
    );
  }

  const handleSubmit = async (e, formValues) => {
    e.preventDefault();
    const requiredFields = ["nome", "rua", "numero", "complemento", "cidade"];

    const isValid = requiredFields.every(
      (field) => formValues[field] !== null && formValues[field] !== ""
    );
    if (isValid) {
      console.log("Formulário enviado:", formValues);
      await adicionarNovoLocalColeta(formValues);
      window.location.reload();
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  return (
    <div>
      <FormularioLocalColeta handleSubmit={handleSubmit} />
      {listaLocaisColeta.length > 0 ? (
        <div className={styles.flexContainer}>
          {listaLocaisColeta.map((localColeta) => (
            <a
              className={styles.locationCard}
              key={localColeta._id}
              href={`/locaiscoleta/${localColeta._id}`}
            >
              <div className={styles.cardContent}>
                <p className={styles.locationName}>{localColeta.nome}</p>
                <p className={styles.locationInfo}>
                  Cidade: {localColeta.cidade.nome}
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className={styles.mensagem}>
          Nenhum local de coleta encontrado.
        </div>
      )}
    </div>
  );
}
