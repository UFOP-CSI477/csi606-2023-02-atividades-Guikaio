import cidades from "../models/Cidade.js";
import { deleteVariasPessoas } from "../services/deleteVariasPessoas.js";
import { deleteVariosLocaisColeta } from "../services/deleteVariosLocaisColeta.js";

class CidadeController {
  static cadastrarCidade = async (req, res) => {
    let cidade = new cidades(req.body);
    try {
      await cidade.save();
      res.status(201).send(cidade.toJSON());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar cidade` });
    }
  };

  static listarCidades = async (req, res) => {
    try {
      const colecaoCidades = await cidades.find().populate("estado");
      res.status(200).json(colecaoCidades);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar as cidades`,
      });
    }
  };

  static listarCidadePorId = async (req, res) => {
    const id = req.params.id;
    try {
      const cidade = await cidades.findById(id).populate("estado");
      res.status(200).json(cidade);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar a cidade com ID ${id}`,
      });
    }
  };

  static atualizarCidade = async (req, res) => {
    const id = req.params.id;
    try {
      await cidades.findByIdAndUpdate(id, { $set: req.body });
      res.status(204).send({ message: "Cidade atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - falha ao atualizar cidade` });
    }
  };

  static deleteCidade = async (req, res) => {
    const id = req.params.id;
    try {
      const cidade = await cidades.findById(id);

      if (!cidade) {
        return res.status(404).send({ message: "Cidade não encontrada" });
      }

      await deleteVariasPessoas("cidade", id);
      await deleteVariosLocaisColeta("cidade", id);
      await cidades.findByIdAndDelete(id);
      res.status(204).send({ message: "Cidade deletada com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - Falha ao deletar cidade`,
      });
    }
  };

  static deleteCidadePorEstado = async (estadoId) => {
    try {
      await cidades.deleteMany({ estado: estadoId });
    } catch (err) {
      console.error(err);
    }
  };
}

export default CidadeController;
