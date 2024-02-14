import { useState, useEffect } from "react";
import {
  buscaLocaisColeta,
  atualizaLocalColeta,
  deletaLocalColeta,
  adicionarLocalColeta,
} from "../services/localColetaService";

const useLocaisColeta = () => {
  const [listaLocaisColeta, setListaLocaisColeta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obterLocaisColeta = async () => {
      try {
        const data = await buscaLocaisColeta();
        setListaLocaisColeta(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    obterLocaisColeta();
  }, []);

  const adicionarNovoLocalColeta = async (novoLocalColeta) => {
    try {
      const data = await adicionarLocalColeta(novoLocalColeta);
      novoLocalColeta._id = data._id;
      setListaLocaisColeta((prevLocaisColeta) => [
        ...prevLocaisColeta,
        novoLocalColeta,
      ]);
    } catch (error) {
      console.error("Erro ao adicionar local de coleta:", error);
      throw error;
    }
  };

  const atualizarLocalColetaExistente = async (localColetaId, updatedLocalColeta) => {
    try {
      await atualizaLocalColeta(localColetaId, updatedLocalColeta);
      setListaLocaisColeta((prevLocaisColeta) =>
        prevLocaisColeta.map((localColeta) =>
          localColeta._id === localColetaId
            ? { ...localColeta, ...updatedLocalColeta }
            : localColeta
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar local de coleta:", error);
      throw error;
    }
  };

  const excluirLocalColeta = async (localColetaId) => {
    try {
      await deletaLocalColeta(localColetaId);
      setListaLocaisColeta((prevLocaisColeta) =>
        prevLocaisColeta.filter(
          (localColeta) => localColeta._id !== localColetaId
        )
      );
    } catch (error) {
      console.error("Erro ao excluir local de coleta:", error);
      throw error;
    }
  };

  return {
    listaLocaisColeta,
    loading,
    error,
    adicionarNovoLocalColeta,
    atualizarLocalColetaExistente,
    excluirLocalColeta,
  };
};

export default useLocaisColeta;
