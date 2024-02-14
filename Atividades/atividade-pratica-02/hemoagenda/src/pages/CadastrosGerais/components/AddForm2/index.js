/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import InputText from "../../../../components/InputText";
import styles from "./styles.module.css"

export default function AddForm2({
  addElement,
  elementTitle,
  elementSubtitle,
  elementpropname1,
  elementpropname2,
}) {
  const [newElementProp1, setNewElementProp1] = useState("");
  const [newElementProp2, setNewElementProp2] = useState("");

  const handleSubmit = (e) => {
    let element = {
      [elementpropname1]: newElementProp1,
      [elementpropname2]: newElementProp2,
    };

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
      addElement(element);
      setNewElementProp1("");
      setNewElementProp2("");
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>{elementTitle}</h1>
        <div>
          <form>
            <InputText
              label={`Insira um novo(a) ${elementSubtitle}:`}
              placeholder={`Digite aqui o ${elementpropname1} do(a) novo(a) ${elementSubtitle}`}
              required
              value={newElementProp1}
              onChange={(e) => setNewElementProp1(e.target.value)}
              id="elementpropname1"
              name="elementpropname1"
            />
            <InputText
              label={`Edite o ${elementpropname2} do(a) ${elementSubtitle}`}
              value={newElementProp2}
              onChange={(e) => setNewElementProp2(e.target.value)}
              placeholder={`Digite aqui o ${elementpropname2} do(a) ${elementSubtitle}`}
              id="elementpropname2"
              name="elementpropname2"
            />
            <button
              type="submit"
              className={styles.submitButton}
              onClick={() => handleSubmit(event)}
            >
              Inserir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
