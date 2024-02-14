"use client";
import InputSelect from "../InputSelect";
import InputText from "../InputText";
import { React, useState } from "react";
import useCidades from "../../hooks/useCidades";
import styles from "./styles.module.css"

export default function FormularioLocalColeta({
  isEdit = false,
  localColeta = { cidade: {}, tipoSanguineo: {} },
  handleSubmit,
  handleCancel = null,
}) {
  const {
    listaCidades,
    loading: cidadesLoading,
    error: cidadesError,
  } = useCidades();

  const [formValues, setFormValues] = useState({
    nome: localColeta.nome || "",
    rua: localColeta.rua || "",
    numero: localColeta.numero || "",
    complemento: localColeta.complemento || "",
    cidade: localColeta.cidade._id || "",
  });

  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitForm = (event, formValues) => {
    handleSubmit(event, formValues);
    if (localColeta == { cidade: {}, tipoSanguineo: {} }) {
      formValues = {
        nome: "",
        rua: "",
        numero: "",
        complemento: "",
        cidade: "",
      };
    }
  };

  if (cidadesError) {
    return (
      <div>
        <h1>
          500: ERRO NO SERVIDOR, CONTATE O SUPORTE
        </h1>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        <InputText
          label="Nome completo:"
          placeholder="Digite aqui o nome"
          id="nome"
          name="nome"
          value={formValues.nome}
          onChange={(e) => handleInputChange("nome", e.target.value)}
        />
        <InputText
          label="Rua:"
          placeholder="Digite a rua do localColeta"
          id="rua"
          name="rua"
          value={formValues.rua}
          onChange={(e) => handleInputChange("rua", e.target.value)}
        />
        <InputText
          label="Numero:"
          placeholder="Digite o numero"
          id="numero"
          name="numero"
          type="numero"
          value={formValues.numero}
          onChange={(e) => handleInputChange("numero", e.target.value)}
        />
        <InputText
          label="Complemento:"
          placeholder="Digite o complemento"
          id="complemento"
          name="complemento"
          type="complemento"
          value={formValues.complemento}
          onChange={(e) => handleInputChange("complemento", e.target.value)}
        />
        {cidadesLoading ? (
          <p className={styles.loadingMessage}>Carregando...</p>
        ) : (
          <InputSelect
            label="Escolha uma cidade:"
            id="cidade"
            name="cidade"
            options={listaCidades}
            onChange={(e) => handleInputChange("cidade", e.target.value)}
            value={formValues.cidade}
            optionSelected={formValues.cidade}
          />
        )}

        {isEdit ? (
          <div className={styles.editButtons}>
            <button
              type="submit"
              onClick={(event) => handleSubmitForm(event, formValues)}
              className={styles.editButton}
            >
              Salvar
            </button>
            <button
              onClick={() => handleCancel()}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className={styles.submitButton}
            onClick={(event) => handleSubmitForm(event, formValues)}
          >
            Enviar Formulário
          </button>
        )}
      </form>
    </div>
  );
}
