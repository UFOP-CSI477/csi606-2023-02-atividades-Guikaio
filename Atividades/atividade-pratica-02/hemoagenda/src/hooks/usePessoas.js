import { useState, useEffect } from "react";
import {
  buscaPessoas,
  atualizaPessoa,
  deletaPessoa,
  adicionaPessoa,
} from "../services/pessoaService";

const usePessoas = () => {
  const [listaPessoas, setListaPessoas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const obterPessoas = async () => {
      try {
        const data = await buscaPessoas();
        setListaPessoas(data);
        setCarregando(false);
      } catch (error) {
        setErro(error);
        setCarregando(false);
      }
    };

    obterPessoas();
  }, []);

  const adicionarNovaPessoa = async (novoPessoa) => {
    try {
      const data = await adicionaPessoa(novoPessoa);
      novoPessoa._id = data._id;
      setListaPessoas((pessoasAntigos) => [...pessoasAntigos, novoPessoa]);
    } catch (error) {
      console.error("Erro ao adicionar pessoa:", error);
      throw error;
    }
  };

  const atualizarPessoaExistente = async (idPessoa, pessoaAtualizado) => {
    try {
      await atualizaPessoa(idPessoa, pessoaAtualizado);
      setListaPessoas((pessoasAntigos) =>
        pessoasAntigos.map((pessoa) =>
          pessoa._id === idPessoa ? { ...pessoa, ...pessoaAtualizado } : pessoa
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
      throw error;
    }
  };

  const excluirPessoa = async (idPessoa) => {
    try {
      await deletaPessoa(idPessoa);
      setListaPessoas((pessoasAntigos) =>
        pessoasAntigos.filter((pessoa) => pessoa._id !== idPessoa)
      );
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
      throw error;
    }
  };

  return {
    listaPessoas,
    carregando,
    erro,
    adicionarNovaPessoa,
    atualizarPessoaExistente,
    excluirPessoa,
  };
};

export default usePessoas;
