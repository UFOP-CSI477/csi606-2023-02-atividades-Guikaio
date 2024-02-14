import { useState, useEffect } from "react";
import {
  addAlbumService,
  getAllAlbunsService,
  updateAlbumService,
  deleteAlbumService,
} from "../services/albumService";

const useAlbuns = () => {
  const [albuns, setAlbuns] = useState([]);
  const [loadingAlbuns, setLoadingAlbuns] = useState(true);
  const [error, setError] = useState(null);

  const addAlbum = async (album) => {
    console.log(album);
    try {
      await addAlbumService(album);
      setAlbuns((prevAlbuns) => [...prevAlbuns, album]);
    } catch (err) {
      console.error("Erro ao adicionar álbum:", err);
      setError(err);
    }
  };

  const updateAlbum = async (id, album) => {
    try {
      await updateAlbumService(id, album);
      setAlbuns((prevAlbuns) =>
        prevAlbuns.map((a) => (a._id === id ? { ...a, ...album } : a))
      );
    } catch (err) {
      console.error("Erro ao atualizar álbum:", err);
      setError(err);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await deleteAlbumService(id);
      setAlbuns((prevAlbuns) => prevAlbuns.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Erro ao excluir álbum:", err);
      setError(err);
    }
  };

  useEffect(() => {
    const fetchAlbuns = async () => {
      try {
        const data = await getAllAlbunsService();
        setAlbuns(data);
        setLoadingAlbuns(false);
      } catch (err) {
        console.error("Erro ao buscar álbuns:", err);
        setError(err);
        setLoadingAlbuns(false);
      }
    };

    fetchAlbuns();
  }, []);

  return {
    albuns,
    loadingAlbuns,
    error,
    addAlbum,
    updateAlbum,
    deleteAlbum,
  };
};

export default useAlbuns;
