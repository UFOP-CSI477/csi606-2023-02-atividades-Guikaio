import pessoas from "../models/Pessoa.js";
import { deleteVariasDoacoes } from "../services/deleteVariasDoacoes.js";

class PessoaController {
  static cadastrarPessoa = async (req, res) => {
    let pessoa = new pessoas(req.body);
    try {
      await pessoa.save();
      res.status(201).send(pessoa.toJSON());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar pessoa` });
    }
  };

  static listarPessoas = async (req, res) => {
    try {
      const colecaoPessoas = await pessoas
        .find()
        .populate({
          path: "cidade",
          populate: [
            {
              path: "estado",
            },
          ],
        })
        .populate("tipoSanguineo");
      res.status(200).json(colecaoPessoas);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar as pessoas`,
      });
    }
  };

  static listarPessoaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const pessoa = await pessoas
        .findById(id)
        .populate({
          path: "cidade",
          populate: [
            {
              path: "estado",
            },
          ],
        })
        .populate("tipoSanguineo");
      res.status(200).json(pessoa);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar a pessoa com ID ${id}`,
      });
    }
  };

  static atualizarPessoa = async (req, res) => {
    const id = req.params.id;
    try {
      await pessoas.findByIdAndUpdate(id, { $set: req.body });
      res.status(204).send({ message: "Pessoa atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - falha ao atualizar pessoa` });
    }
  };

  static deletePessoa = async (req, res) => {
    const id = req.params.id;
    try {
      const pessoa = await pessoas.findById(id);
      if (!pessoa) {
        res.status(404).send({ message: "Pessoa não encontrada" });
      }

      await deleteVariasDoacoes("pessoa", id);
      await pessoas.findByIdAndDelete(id);

      res.status(204).send({ message: "Pessoa deletada com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - Falha ao deletar pessoa`,
      });
    }
  };
}

export default PessoaController;
