import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../../components/Form";
import useAlbuns from "../../hooks/useAlbuns";
import { getAlbumByIdService } from "../../services/albumService";
import styles from "./styles.module.css"

const UpdateAlbum = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const { updateAlbum } = useAlbuns();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getAlbumByIdService(id);
        setLoading(false);
        setAlbum(data);
        setPreviewImage(
          album.capa ? `http://localhost:8800/uploads/${album.capa}` : null
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlbum();
  }, [id, album.capa]);

  return (
    <div className={styles.formContainer}>
      {loading ? (
        <p>Carregando....</p>
      ) : (
        <Form
          formLabel={"Atualizar album"}
          formSubmitFunction={updateAlbum}
          buttonText={"Atualizar"}
          oldAlbum={album}
          isEdit={true}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      )}
    </div>
  );
};

export default UpdateAlbum;
