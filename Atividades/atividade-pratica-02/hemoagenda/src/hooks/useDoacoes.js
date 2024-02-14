import { useState, useEffect } from "react";
import {
  buscarDoacoes,
  atualizarDoacao,
  deletarDoacao,
  adicionarDoacao,
} from "../services/doacaoService";

const useDoacoes = () => {
  const [listaDoacoes, setListaDoacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const obterDoacoes = async () => {
      try {
        const dados = await buscarDoacoes();

        setListaDoacoes(dados);
        setCarregando(false);
      } catch (error) {
        setErro(error);
        setCarregando(false);
      }
    };

    obterDoacoes();
  }, []);

  const adicionarNovaDoacao = async (novaDoacao) => {
    try {
      const dados = await adicionarDoacao(novaDoacao);
      novaDoacao._id = dados._id;
      setListaDoacoes((doacoesAntigas) => [
        ...doacoesAntigas,
        novaDoacao,
      ]);
    } catch (error) {
      console.error("Erro ao adicionar doação:", error);
      throw error;
    }
  };

  const atualizarDoacaoExistente = async (idDoacao, doacaoAtualizada) => {
    try {
      await atualizarDoacao(idDoacao, doacaoAtualizada);
      setListaDoacoes((doacoesAntigas) =>
        doacoesAntigas.map((doacao) =>
          doacao._id === idDoacao
            ? { ...doacao, ...doacaoAtualizada }
            : doacao
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar doação:", error);
      throw error;
    }
  };

  const excluirDoacao = async (idDoacao) => {
    try {
      await deletarDoacao(idDoacao);
      setListaDoacoes((doacoesAntigas) =>
        doacoesAntigas.filter(
          (doacao) => doacao._id !== idDoacao
        )
      );
    } catch (error) {
      console.error("Erro ao excluir doação:", error);
      throw error;
    }
  };

  return {
    listaDoacoes,
    carregando,
    erro,
    adicionarNovaDoacao,
    atualizarDoacaoExistente,
    excluirDoacao,
  };
};

export default useDoacoes;
