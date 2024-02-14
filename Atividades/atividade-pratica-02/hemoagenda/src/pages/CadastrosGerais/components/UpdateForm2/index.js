import InputSelect from "../../../../components/InputSelect";
import InputText from "../../../../components/InputText";
import React from "react";
import { useState } from "react";
import styles from "./styles.module.css"

export default function UpdateForm2({
  elementTitle,
  elementSubtitle,
  elements,
  updateElement,
  deleteElement,
  getElementById,
  elementpropname1,
  elementpropname2,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [newElementProp1, setNewElementProp1] = useState("");
  const [newElementProp2, setNewElementProp2] = useState("");
  const [editField, setEditField] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["elementpropname1", "elementpropname2"];

    const isValid = requiredFields.every(
      (field) =>
        newElementProp1 !== null &&
        newElementProp1.trim() !== "" &&
        newElementProp2 !== null &&
        newElementProp2.trim() !== ""
    );
    if (isValid) {
      let element = await getElementById(selectedOption);
      element[elementpropname1] = newElementProp1;
      element[elementpropname2] = newElementProp2;
      await updateElement(element._id, element);
      setEditField(!editField);
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  const handleCancel = () => {
    setEditField(!editField);
    const element = elements.find((el) => el._id === selectedOption);
    setNewElementProp1(element[elementpropname1]);
  };

  const handleEdit = () => {
    setEditField(!editField);
  };

  const handleDelete = async () => {
    console.log(selectedOption)
    await deleteElement(selectedOption);
    setSelectedOption("");
    window.location.reload();
  };

  const handleSetSelectedOption = (option) => {
    setSelectedOption(option);
    const element = elements.find((el) => el._id === option);
    setNewElementProp1(element[elementpropname1]);
    setNewElementProp2(element[elementpropname2]);
  };

  return (
    <div className={styles.container}>
      {!editField && (
        <InputSelect
          label={`Escolha um(a) ${elementTitle} para editar`}
          options={elements}
          onChange={(e) => handleSetSelectedOption(e.target.value)}
          value={selectedOption}
          optionViewName={elementpropname1}
        />
      )}
      {editField && (
        <>
          <form className={styles.editForm}>
            <InputText
              label={`Edite o nome do(a) ${elementSubtitle}`}
              value={newElementProp1}
              onChange={(e) => setNewElementProp1(e.target.value)}
              placeholder={`Digite aqui o ${elementpropname1} do(a) ${elementSubtitle}`}
              id="elementpropname1"
              elementpropname1="elementpropname1"
            />
            <InputText
              label={`Edite o nome da abrevição do(a) ${elementSubtitle}`}
              value={newElementProp2}
              onChange={(e) => setNewElementProp2(e.target.value)}
              placeholder={`Digite aqui o ${elementpropname2} do(a) ${elementSubtitle}`}
              id="elementpropname2"
              elementpropname1="elementpropname2"
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
                className={styles.cancelButton}
                onClick={() => handleCancel()}
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
