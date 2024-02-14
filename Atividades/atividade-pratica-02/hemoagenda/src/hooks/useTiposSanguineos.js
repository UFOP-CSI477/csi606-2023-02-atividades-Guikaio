import { useState, useEffect } from "react";
import {
  buscarTiposSanguineos,
  atualizarTipoSanguineo,
  deletarTipoSanguineo,
  adicionarTipoSanguineo,
} from "../services/tipoSanguineoService";

const useTiposSanguineos = () => {
  const [listaTiposSanguineos, setListaTiposSanguineos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const obterTiposSanguineos = async () => {
      try {
        const data = await buscarTiposSanguineos();
        setListaTiposSanguineos(data);
        setCarregando(false);
      } catch (error) {
        setErro(error);
        setCarregando(false);
      }
    };

    obterTiposSanguineos();
  }, []);

  const adicionarNovoTipoSanguineo = async (novoTipoSanguineo) => {
    try {
      const data = await adicionarTipoSanguineo(novoTipoSanguineo);
      novoTipoSanguineo._id = data._id;
      setListaTiposSanguineos((tiposSanguineosAntigos) => [...tiposSanguineosAntigos, novoTipoSanguineo]);
    } catch (error) {
      console.error("Erro ao adicionar Tipo Sanguineo:", error);
      throw error;
    }
  };

  const atualizarTipoSanguineoExistente = async (idTipoSanguineo, tipoSanguineoAtualizado) => {
    try {
      await atualizarTipoSanguineo(idTipoSanguineo, tipoSanguineoAtualizado);
      setListaTiposSanguineos((tiposSanguineosAntigos) =>
        tiposSanguineosAntigos.map((tipoSanguineo) =>
          tipoSanguineo._id === idTipoSanguineo
            ? { ...tipoSanguineo, ...tipoSanguineoAtualizado }
            : tipoSanguineo
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar Tipo Sanguineo:", error);
      throw error;
    }
  };

  const excluirTipoSanguineo = async (idTipoSanguineo) => {
    try {
      await deletarTipoSanguineo(idTipoSanguineo);
      setListaTiposSanguineos((tiposSanguineosAntigos) =>
        tiposSanguineosAntigos.filter((tipoSanguineo) => tipoSanguineo._id !== idTipoSanguineo)
      );
    } catch (error) {
      console.error("Erro ao excluir Tipo Sanguineo:", error);
      throw error;
    }
  };

  return {
    listaTiposSanguineos,
    carregando,
    erro,
    adicionarNovoTipoSanguineo,
    atualizarTipoSanguineoExistente,
    excluirTipoSanguineo,
  };
};

export default useTiposSanguineos;
