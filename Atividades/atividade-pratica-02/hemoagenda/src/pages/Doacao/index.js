"use client";
import React, { useEffect, useState } from "react";
import { buscarDoacaoPorId } from "../../services/doacaoService";
import { useNavigate, useParams } from "react-router-dom";
import FormularioDoacao from "../../components/FormularioDoacao";
import useDoacoes from "../../hooks/useDoacoes";
import styles from "./styles.module.css";

export default function Doacao() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doacao, setDoacao] = useState(null);
  const [editDoacaoForm, setEditDoacaoForm] = useState(false);
  const { atualizarDoacaoExistente, excluirDoacao } = useDoacoes();

  const navigation = useNavigate();
  const params = useParams();

  const handleEdit = () => {
    setEditDoacaoForm(true);
  };

  useEffect(() => {
    const fetchDoacao = async () => {
      try {
        const data = await buscarDoacaoPorId(params.id);
        
        const dataFormata = new Date(data.data)
        data.data = dataFormata.toISOString().split('T')[0]
        setDoacao(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchDoacao();
  }, [params.id]);

  const handleSubmit = async (e, formValues) => {
    e.preventDefault();
    const requiredFields = ["doador", "localColeta", "data"];
    const isValid = requiredFields.every(
      (field) => formValues[field] !== null && formValues[field] !== ""
    );

    if (isValid) {
      await atualizarDoacaoExistente(params.id, formValues);
      setEditDoacaoForm(!editDoacaoForm);
      window.location.reload();
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  const handleDelete = async () => {
    await excluirDoacao(params.id);
    navigation("/");
  };

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Ocorreu um erro ao carregar os detalhes da doação.</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (editDoacaoForm) {
    return (
      <FormularioDoacao
        isEdit={true}
        handleSubmit={handleSubmit}
        handleCancel={() => {
          setEditDoacaoForm(false);
        }}
        doacao={doacao}
      />
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles}>
          <div>
            <h2 className={styles.title}>Informações da doação</h2>
            <p className={styles.paragraph}>Doador: {doacao.pessoa.nome}</p>
            <p className={styles.paragraph}>
              Tipo Sanguineo: {doacao.pessoa.tipoSanguineo.tipo}{" "}
              {doacao.pessoa.tipoSanguineo.fator}
            </p>
            <p className={styles.paragraph}>
              Local de coleta: {doacao.localColeta.nome}
            </p>
            <p className={styles.paragraph}>
              Cidade: {doacao.localColeta.cidade.nome}
            </p>
            <p className={styles.paragraph}>
              Estado: {doacao.localColeta.cidade.estado.nome} (
              {doacao.localColeta.cidade.estado.sigla})
            </p>
            <p className={styles.paragraph}>
              Data: {doacao.data}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleEdit()}
            className={`${styles.button} ${styles.editButton}`}
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete()}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
