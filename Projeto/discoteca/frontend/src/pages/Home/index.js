import React from "react";
import CardAlbum from "./components/CardAlbum";
import useAlbuns from "../../hooks/useAlbuns";
import styles from "./styles.module.css"

const Home = () => {
  const {deleteAlbum, albuns} = useAlbuns();

  const handleDelete = async (id) => {
    try {
      await deleteAlbum(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>     
      <div className={styles.albuns}>
        {albuns.length > 0 ? albuns.map((album) => (
          <CardAlbum key={album._id} album={album} handleDelete={handleDelete}/>
        )) : <p>Nenhum album encontrado</p>}
      </div>
    </div>
  );
};

export default Home;
