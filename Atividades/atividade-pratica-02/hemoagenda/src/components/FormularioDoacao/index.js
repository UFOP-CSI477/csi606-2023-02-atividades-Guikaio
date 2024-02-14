import React from "react";
import usePessoas from "../../hooks/usePessoas";
import useLocaisColeta from "../../hooks/useLocaisColeta";
import { useState } from "react";
import InputData from "../../components/InputData";
import InputSelect from "../../components/InputSelect";
import styles from "./styles.module.css";

export default function FormularioDoacao({
  isEdit = false,
  doacao = { pessoa: {}, localColeta: {} },
  handleSubmit,
  handleCancel = null,
}) {
  const {
    listaLocaisColeta,
    loading: locaisColetaLoading,
    error: locaisColetaError,
  } = useLocaisColeta();
  const {
    listaPessoas,
    loading: listaPessoasLoading,
    error: listaPessoasError,
  } = usePessoas();

  const [formValues, setFormValues] = useState({
    pessoa: doacao.pessoa._id || "",
    localColeta: doacao.localColeta._id || "",
    data: doacao.data || "",
  });

  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitForm = (event, formValues) => {
    handleSubmit(event, formValues);
    if (doacao == { pessoa: {}, localColeta: {} }) {
      formValues = {
        pessoa: "",
        localColeta: "",
      };
    }
  };

  if (locaisColetaError || listaPessoasError) {
    return (
      <div>
        <h1>500: ERRO NO SERVIDOR, CONTATE O SUPORTE</h1>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {listaPessoasLoading ? (
          <p>Carregando...</p>
        ) : (
          <InputSelect
            label="Escolha um pessoa:"
            id="pessoa"
            name="pessoa"
            options={listaPessoas}
            onChange={(e) => handleInputChange("pessoa", e.target.value)}
            value={formValues.pessoa}
            optionSelected={formValues.pessoa}
          />
        )}
        {locaisColetaLoading ? (
          <p>Carregando...</p>
        ) : (
          <InputSelect
            label="Escolha um local de coleta:"
            id="localColeta"
            name="localColeta"
            options={listaLocaisColeta}
            onChange={(e) => handleInputChange("localColeta", e.target.value)}
            value={formValues.localColeta}
            optionSelected={formValues.localColeta}
          />
        )}
        <InputData
          label="Data"
          id="data"
          name="data"
          value={formValues.data}
          onChange={(e) => handleInputChange("data", e.target.value)}
        />

        {isEdit ? (
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              onClick={(event) => handleSubmitForm(event, formValues)}
              className={styles.saveButton}
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
            onClick={(event) => handleSubmitForm(event, formValues)}
            className={styles.submitButton}
          >
            Enviar Formulário
          </button>
        )}
      </form>
    </div>
  );
}
