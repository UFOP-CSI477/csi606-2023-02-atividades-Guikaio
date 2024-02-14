import InputSelect from "../../../../components/InputSelect";
import InputText from "../../../../components/InputText";
import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

export default function UpdateForm({
  elementTitle,
  elementSubtitle,
  elements,
  updateElement,
  deleteElement,
  getElementById,
  selectOptions,
  selectOptionViewName,
  selectOptionLabel,
  selectOptionValue,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPropOption, setSelectedPropOption] = useState("");
  const [newElementName, setNewElementName] = useState("");
  const [editField, setEditField] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["nome"];

    const isValid = requiredFields.every(
      (field) => newElementName !== null && newElementName.trim() !== ""
    );
    if (isValid) {
      let element = await getElementById(selectedOption);
      element.nome = newElementName;
      element[selectOptionValue] = selectedPropOption;
      await updateElement(element.id, element);
      setEditField(!editField);
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  const handleCancel = () => {
    setEditField(!editField);
    const element = elements.find((el) => el._id === selectedOption);
    setNewElementName(element.nome);
  };

  const handleEdit = () => {
    setEditField(!editField);
  };

  const handleDelete = async () => {
    await deleteElement(selectedOption);
    setSelectedOption("");
    window.location.reload();
  };

  const handleSetSelectedOption = (option) => {
    setSelectedOption(option);
    const element = elements.find((el) => el._id === option);
    setNewElementName(element.nome);
    if (element[selectOptionLabel]) {
      setSelectedPropOption(element[selectOptionLabel].id);
    } else {
      setSelectedPropOption(element[selectOptionValue]);
    }
  };

  return (
    <div className={styles.container}>
      {!editField && (
        <InputSelect
          label={`Escolha um(a) ${elementTitle} para editar`}
          options={elements}
          onChange={(e) => handleSetSelectedOption(e.target.value)}
          value={selectedOption}
          optionViewName={"nome"}
        />
      )}
      {editField && (
        <>
          <form className={styles.editForm}>
            <InputText
              label={`Edite o nome do(a) ${elementTitle}`}
              value={newElementName}
              onChange={(e) => setNewElementName(e.target.value)}
              placeholder={`Digite aqui o novo nome do(a) ${elementSubtitle}`}
              id="nome"
              nome="nome"
            />

            <InputSelect
              label={`Escolha um(a) ${selectOptionLabel}`}
              options={selectOptions}
              onChange={(e) => setSelectedPropOption(e.target.value)}
              value={selectedPropOption}
              optionViewName={selectOptionViewName}
            />

            <div>
              <button
                type="submit"
                className={styles.saveButton}
                onClick={(event) => handleSubmit(event)}
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
          </form>
        </>
      )}
      {!editField && selectedOption != "" && (
        <>
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
        </>
      )}
    </div>
  );
}
