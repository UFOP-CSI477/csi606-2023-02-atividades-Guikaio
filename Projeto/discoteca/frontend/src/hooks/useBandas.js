import { useState, useEffect } from "react";
import {
  addBandaService,
  getAllBandasService,
  updateBandaService,
  deleteBandaService,
} from "../services/bandaService";

const useBandas = () => {
  const [bandas, setBandas] = useState([]);
  const [loadingBandas, setLoadingBandas] = useState(true);
  const [error, setError] = useState(null);

  const addBanda = async (banda) => {
    try {
      const response = await addBandaService(banda);
      setBandas((prevBandas) => [...prevBandas, response]);
    } catch (err) {
      console.error("Erro ao adicionar banda:", err);
      setError(err);
    }
  };

  const updateBanda = async (id, banda) => {
    try {
      await updateBandaService(id, banda);

      setBandas((prevBandas) =>
        prevBandas.map((oldBanda) =>
          oldBanda._id === id ? { ...oldBanda, ...banda } : oldBanda
        )
      );
      console.log(bandas);
    } catch (err) {
      console.error("Erro ao atualizar banda:", err);
      setError(err);
    }
  };

  const deleteBanda = async (id) => {
    try {
      await deleteBandaService(id);
      setBandas((prevBandas) => prevBandas.filter((banda) => banda._id !== id));
    } catch (err) {
      console.error("Erro ao excluir banda:", err);
      setError(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBandasService();
        setBandas(data);
        setLoadingBandas(false);
      } catch (err) {
        console.error("Erro ao buscar bandas:", err);
        setError(err);
        setLoadingBandas(false);
      }
    };

    fetchData();
  }, [bandas]);

  return {
    bandas,
    loadingBandas,
    error,
    addBanda,
    updateBanda,
    deleteBanda,
  };
};

export default useBandas;
