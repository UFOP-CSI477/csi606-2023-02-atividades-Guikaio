import tiposSanguineos from "../models/TipoSanguineo.js";
import { deleteVariasPessoas } from "../services/deleteVariasPessoas.js";

class TipoSanguineoController {
  static cadastrarTipoSanguineo = async (req, res) => {
    let tipoSanguineo = new tiposSanguineos(req.body);
    try {
      await tipoSanguineo.save();
      res.status(201).send(tipoSanguineo.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `${error.message} - falha ao cadastrar tipoSanguineo`,
      });
    }
  };

  static listarTiposSanguineos = async (req, res) => {
    try {
      const colecaoTiposSanguineos = await tiposSanguineos.find();
      res.status(200).json(colecaoTiposSanguineos);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar as tiposSanguineos`,
      });
    }
  };

  static listarTipoSanguineoPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const tipoSanguineo = await tiposSanguineos.findById(id);
      res.status(200).json(tipoSanguineo);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar a tipoSanguineo com ID ${id}`,
      });
    }
  };

  static atualizarTipoSanguineo = async (req, res) => {
    const id = req.params.id;
    try {
      await tiposSanguineos.findByIdAndUpdate(id, { $set: req.body });
      res.status(204).send({ message: "TipoSanguineo atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - falha ao atualizar tipoSanguineo` });
    }
  };

  static deleteTipoSanguineo = async (req, res) => {
    const id = req.params.id;
    try {
      const tipoSanguineo = await tiposSanguineos.findById(id);

      if (!tipoSanguineo) {
        return res
          .status(404)
          .send({ message: "TipoSanguineo não encontrado" });
      }

      await deleteVariasPessoas("tipoSanguineo", id)
      await tiposSanguineos.findByIdAndDelete(id);
      res.status(204).send({
        message: "TipoSanguineo deletado com sucesso",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - Falha ao deletar tipoSanguineo`,
      });
    }
  };
}

export default TipoSanguineoController;
