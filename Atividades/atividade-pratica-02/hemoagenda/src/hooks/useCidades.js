import { useState, useEffect } from "react";
import {
  buscarCidades,
  atualizarCidade,
  deletarCidade,
  adicionarCidade,
} from "../services/cidadeService";

const useCidades = () => {
  const [listaCidades, setListaCidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const obterCidades = async () => {
      try {
        const dados = await buscarCidades();
        setListaCidades(dados);
        setCarregando(false);
      } catch (error) {
        setErro(error);
        setCarregando(false);
      }
    };

    obterCidades();
  }, []);

  const adicionarNovaCidade = async (novaCidade) => {
    try {
      const dados = await adicionarCidade(novaCidade);
      novaCidade._id = dados._id;
      setListaCidades((cidadesAntigas) => [...cidadesAntigas, novaCidade]);
    } catch (error) {
      console.error("Erro ao adicionar cidade:", error);
      throw error;
    }
  };

  const atualizarCidadeExistente = async (idCidade, cidadeAtualizada) => {
    try {
      await atualizarCidade(idCidade, cidadeAtualizada);
      setListaCidades((cidadesAntigas) =>
        cidadesAntigas.map((cidade) =>
          cidade.id === idCidade ? { ...cidade, ...cidadeAtualizada } : cidade
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar cidade:", error);
      throw error;
    }
  };

  const excluirCidade = async (idCidade) => {
    try {
      await deletarCidade(idCidade);
      setListaCidades((cidadesAntigas) =>
        cidadesAntigas.filter((cidade) => cidade._id !== idCidade)
      );
    } catch (error) {
      console.error("Erro ao excluir cidade:", error);
      throw error;
    }
  };

  return {
    listaCidades,
    carregando,
    erro,
    adicionarNovaCidade,
    atualizarCidadeExistente,
    excluirCidade,
  };
};

export default useCidades;
