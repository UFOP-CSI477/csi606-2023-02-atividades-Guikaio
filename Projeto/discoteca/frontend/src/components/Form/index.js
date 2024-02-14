import React from "react";
import { useState } from "react";
import InputForm from "../InputForm";
import TextAreaForm from "../TextAreaForm";
import { useNavigate } from "react-router-dom";
import InputSelect from "../InputSelect";
import useBandas from "../../hooks/useBandas";
import styles from "./styles.module.css";

export default function Form({
  formLabel,
  formSubmitFunction,
  buttonText,
  oldAlbum = { banda: {} },
  isEdit = false,
  previewImage = null,
  setPreviewImage = null,
}) {
  const [album, setAlbum] = useState({
    titulo: oldAlbum.titulo || "",
    descricao: oldAlbum.descricao || "",
    preco: oldAlbum.preco || "",
    capa: oldAlbum.capa || "",
    banda: oldAlbum.banda._id || "",
  });
  const { bandas, loadingBandas } = useBandas();

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "capa") {
      const selectedFile = e.target.files[0];
      setAlbum((prev) => ({ ...prev, [e.target.name]: selectedFile }));
      if (isEdit) {
        setPreviewImage(URL.createObjectURL(selectedFile));
      }
    } else {
      setAlbum((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      !album.titulo.trim() ||
      !album.descricao.trim() ||
      !album.preco ||
      !album.capa ||
      !album.banda
    ) {
      alert(
        "Todos os campos são obrigatórios e não podem conter apenas espaços."
      );
      return;
    }

    const formData = new FormData();
    formData.append("titulo", album.titulo);
    formData.append("descricao", album.descricao);
    formData.append("capa", album.capa);
    formData.append("preco", album.preco);
    formData.append("banda", album.banda);
    console.log(album);
    console.log(formData);
    try {
      if (isEdit) {
        await formSubmitFunction(oldAlbum._id, formData);
      } else {
        await formSubmitFunction(formData);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>{formLabel}</h1>
      <form>
        <InputForm
          type="text"
          placeholder="Título do álbum"
          name="titulo"
          value={album.titulo}
          onChange={handleChange}
        />
        <TextAreaForm
          rows={5}
          placeholder="Descrição do álbum"
          name="descricao"
          value={album.descricao}
          onChange={handleChange}
        />
        <InputForm
          type="number"
          placeholder="Preço do álbum"
          name="preco"
          value={album.preco}
          onChange={handleChange}
        />
        <InputForm
          type="file"
          accept="image/*"
          placeholder="Capa do álbum"
          name="capa"
          onChange={handleChange}
        />
        {loadingBandas ? (
          <p>Carregando.....</p>
        ) : (
          <InputSelect
            options={bandas}
            selectedValue={album.banda}
            onValueChange={(value) =>
              setAlbum((prev) => ({ ...prev, banda: value }))
            }
          />
        )}

        {previewImage && isEdit && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "50%", marginTop: "10px" }}
          />
        )}
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonSumbit}
            onClick={handleClick}
            type="submit"
          >
            {buttonText}
          </button>
          {error && "Algo deu errado!"}
          <button type="button" onClick={() => navigate("/")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
