"use client";
import { React, useEffect } from "react";
import usePessoas from "../../hooks/usePessoas";
import DoadorForm from "../../components/FormularioPessoa";
import styles from "./styles.module.css";

export default function Pessoas() {
  const { listaPessoas, loading, error, adicionarNovaPessoa } = usePessoas();

  useEffect(() => {}, []);
  if (loading) {
    return <p className={styles.mensagens}>Carregando doadores...</p>;
  }

  if (error) {
    return (
      <p className={styles.mensagens}>
        Ocorreu um erro ao carregar os doadores: {error.message}
      </p>
    );
  }

  const handleSubmit = async (e, formValues) => {
    e.preventDefault();
    const requiredFields = [
      "nome",
      "rg",
      "rua",
      "numero",
      "cidade",
      "tipoSanguineo",
      "idade",
    ];

    const isValid = requiredFields.every(
      (field) => formValues[field] !== null && formValues[field] !== ""
    );
    if (isValid) {
      console.log("Formulário enviado:", formValues);
      await adicionarNovaPessoa(formValues);
      window.location.reload();
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  return (
    <div className={styles.container}>
      <DoadorForm handleSubmit={handleSubmit} />
      {listaPessoas.length > 0 ? (
        <div className={styles.flexContainer}>
          {listaPessoas.map((doador) => (
            <a
              key={doador._id}
              href={`/pessoas/${doador._id}`}
              className={styles.pessoaCard}
            >
              <div className={styles.pessoaCard}>
                <div className={styles.cardContent}>
                  <p className={styles.nomePessoa}>{doador.nome}</p>
                  <p className={styles.rgText}>RG: {doador.rg}</p>
                  <p className={styles.tipoSanguineo}>
                    Tipo Sanguineo: {doador.tipoSanguineo.tipo}{" "}
                    {doador.tipoSanguineo.fator}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className={styles.mensagens}>Nenhum doador encontrado.</p>
      )}
    </div>
  );
}
