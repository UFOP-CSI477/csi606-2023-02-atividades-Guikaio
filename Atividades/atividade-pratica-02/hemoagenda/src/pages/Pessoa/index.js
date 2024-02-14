"use client";
import React, { useEffect, useState } from "react";
import { buscaPessoaPorId } from "../../services/pessoaService";
import FormularioPessoa from "../../components/FormularioPessoa";
import { useNavigate, useParams } from "react-router-dom";
import usePessoas from "../../hooks/usePessoas";
import styles from "./styles.module.css";

export default function Doador() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pessoa, setDoador] = useState(null);
  const [editDoadorForm, setEditDoadorForm] = useState(false);
  const { atualizarPessoaExistente, excluirPessoa } = usePessoas();

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const navigation = useNavigate();
  const params = useParams();

  const handleEdit = () => {
    setEditDoadorForm(true);
  };

  useEffect(() => {
    const fetchDoador = async () => {
      try {
        const data = await buscaPessoaPorId(params.id);
        setDoador(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDoador();
  }, [params.id]);

  const handleSubmit = async (e, formValues) => {
    e.preventDefault();
    const requiredFields = [
      "nome",
      "rg",
      "cidade",
      "rua",
      "numero",
      "departament",
      "tipoSanguineo",
    ];
    const isValid = requiredFields.every(
      (field) => formValues[field] !== null && formValues[field] !== ""
    );

    if (isValid) {
      await atualizarPessoaExistente(params.id, formValues);
      setEditDoadorForm(!editDoadorForm);
      window.location.reload();
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  const handleDelete = async () => {
    await excluirPessoa(params.id);
    navigation("/doadores");
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
        <h1>Ocorreu um erro ao carregar os detalhes da pessoa.</h1>
        <p>{error.messidade}</p>
      </div>
    );
  }

  if (editDoadorForm) {
    return (
      <FormularioPessoa
        isEdit={true}
        handleSubmit={handleSubmit}
        handleCancel={() => {
          setEditDoadorForm(false);
        }}
        pessoa={pessoa}
      />
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div>
          <h2 className={styles.title}>{pessoa.nome}</h2>
        </div>
        <div>
          <div className={styles.personalInfo}>
            <h2>Informações Pessoais</h2>
            <p>
              Endereço: {pessoa.rua}, {pessoa.numero}
            </p>
            <p>Complemento: {pessoa.complemento}</p>
            <p>Cidade: {pessoa.cidade.nome}</p>
            <p>
              Estado: {pessoa.cidade.estado.nome} ({pessoa.cidade.estado.sigla})
            </p>
            <p>
              Tipo Sanguineo: {pessoa.tipoSanguineo.tipo}{" "}
              {pessoa.tipoSanguineo.fator}
            </p>
          </div>
        </div>
        <div>
          <button className={styles.editButton} onClick={() => handleEdit()}>
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
