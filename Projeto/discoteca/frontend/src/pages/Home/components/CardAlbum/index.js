import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function CardAlbum({ album, handleDelete }) {
  return (
    <div className={styles.album}>
      <img
        src={`http://localhost:8800/uploads/${album.capa}`}
        alt={`Capa do álbum ${album.titulo}`}
      />
      <h2>{album.titulo}</h2>
      <span>Banda: {album.banda.nome}</span>
      <p>{album.descricao}</p>
      <span>R${album.preco.toFixed(2)}</span>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.deleta}
          onClick={() => handleDelete(album._id)}
        >
          Delete
        </button>
        <button className={styles.edita}>
          <Link
            to={`/atualizaralbum/${album._id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Edit
          </Link>
        </button>
      </div>
    </div>
  );
}
