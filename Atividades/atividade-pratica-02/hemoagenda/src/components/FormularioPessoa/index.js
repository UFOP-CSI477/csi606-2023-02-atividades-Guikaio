import InputSelect from "../../components/InputSelect";
import InputText from "../../components/InputText";
import { React, useState } from "react";
import useCidades from "../../hooks/useCidades";
import useTiposSanguineos from "../../hooks/useTiposSanguineos";
import styles from "./styles.module.css"

export default function FormularioPessoa({
  isEdit = false,
  pessoa = { cidade: {}, tipoSanguineo: {} },
  handleSubmit,
  handleCancel = null,
}) {
  const {
    listaCidades,
    loading: cidadesLoading,
    error: cidadesError,
  } = useCidades();
  const {
    listaTiposSanguineos,
    loading: tiposSanguineosLoading,
    error: tipoSanguineosError,
  } = useTiposSanguineos();

  const [formValues, setFormValues] = useState({
    nome: pessoa.nome || "",
    rg: pessoa.rg || "",
    rua: pessoa.rua || "",
    numero: pessoa.numero || "",
    complemento: pessoa.complemento || "",
    cidade: pessoa.cidade._id || "",
    tipoSanguineo: pessoa.tipoSanguineo._id || "",
  });

  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitForm = (event, formValues) => {
    handleSubmit(event, formValues);
    if (pessoa == { cidade: {}, tipoSanguineo: {} }) {
      formValues = {
        nome: "",
        rg: "",
        rua: "",
        numero: "",
        cidade: "",
        tipoSanguineo: "",
      };
    }
  };

  if (cidadesError || tipoSanguineosError) {
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
        className={styles.formContainer}
        onSubmit={handleSubmit}
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
          label="RG:"
          placeholder="Digite aqui o RG da pessoa"
          id="rg"
          name="rg"
          value={formValues.rg}
          onChange={(e) => handleInputChange("rg", e.target.value)}
        />
        <InputText
          label="Rua:"
          placeholder="Digite a rua da pessoa"
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
          <p>Carregando...</p>
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
        {tiposSanguineosLoading ? (
          <p className={styles.loadingText}>Carregando...</p>
        ) : (
          <InputSelect
            label="Escolha um tipo sanguineo:"
            id="tipoSanguineo"
            name="tipoSanguineo"
            options={listaTiposSanguineos}
            onChange={(e) =>
              handleInputChange("tipoSanguineo", e.target.value)
            }
            value={formValues.tipoSanguineo}
            optionSelected={formValues.tipoSanguineo}
            optionViewName="tipo"
          />
        )}

        {isEdit ? (
          <div className={styles.editButtons}>
            <button
              type="submit"
              className={styles.saveButton}        
              onClick={(event) => handleSubmitForm(event, formValues)}
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
