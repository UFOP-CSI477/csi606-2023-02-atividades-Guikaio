import { useState, useEffect } from "react";
import {
  buscarEstados,
  atualizaEstado,
  deletarEstado,
  adicionarEstado,
} from "../services/estadoService";

const useEstados = () => {
  const [listaEstados, setListaEstados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const obterEstados = async () => {
      try {
        const dados = await buscarEstados();
        setListaEstados(dados);
        setCarregando(false);
      } catch (error) {
        setErro(error);
        setCarregando(false);
      }
    };

    obterEstados();
  }, []);

  const adicionarNovoEstado = async (novoEstado) => {
    try {
      const dados = await adicionarEstado(novoEstado);
      novoEstado._id = dados._id;
      setListaEstados((estadosAntigos) => [...estadosAntigos, novoEstado]);
    } catch (error) {
      console.error("Erro ao adicionar estado:", error);
      throw error;
    }
  };

  const atualizarEstadoExistente = async (idEstado, estadoAtualizado) => {
    console.log(idEstado, estadoAtualizado)
    try {
      await atualizaEstado(idEstado, estadoAtualizado);
      setListaEstados((estadosAntigos) =>
        estadosAntigos.map((estado) =>
          estado._id === idEstado ? { ...estado, ...estadoAtualizado } : estado
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar estado:", error);
      throw error;
    }
  };

  const excluirEstado = async (idEstado) => {
    try {
      await deletarEstado(idEstado);
      setListaEstados((estadosAntigos) =>
        estadosAntigos.filter((estado) => estado._id !== idEstado)
      );
    } catch (error) {
      console.error("Erro ao excluir estado:", error);
      throw error;
    }
  };

  return {
    listaEstados,
    carregando,
    erro,
    adicionarNovoEstado,
    atualizarEstadoExistente,
    excluirEstado,
  };
};

export default useEstados;
