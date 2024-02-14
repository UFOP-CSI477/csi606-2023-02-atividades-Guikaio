import React from "react";
import Form from "../../components/Form";
import useAlbuns from "../../hooks/useAlbuns";
import styles from "./styles.module.css"

const AddAlbum = () => {
  const { addAlbum } = useAlbuns();

  return (
    <div className={styles.formContainer}>
      <Form
        formLabel={"Adicionar novo album"}
        formSubmitFunction={addAlbum}
        buttonText={"Adicionar"}
      />
    </div>
  );
};

export default AddAlbum;
