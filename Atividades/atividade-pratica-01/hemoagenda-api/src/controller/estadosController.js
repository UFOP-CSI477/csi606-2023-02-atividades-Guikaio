import estados from "../models/Estado.js";
import { deleteVariasCidades } from "../services/deleteVariasCidades.js";

class EstadoController {
  static cadastrarEstado = async (req, res) => {
    let estado = new estados(req.body);
    try {
      await estado.save();
      res.status(201).send(estado.toJSON());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar estado` });
    }
  };

  static listarEstados = async (req, res) => {
    try {
      const colecaoEstados = await estados.find();
      res.status(200).json(colecaoEstados);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar os estados`,
      });
    }
  };

  static listarEstadoPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const estado = await estados.findById(id);
      res.status(200).json(estado);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar o estado com ID ${id}`,
      });
    }
  };

  static atualizarEstado = async (req, res) => {
    const id = req.params.id;
    try {
      await estados.findByIdAndUpdate(id, { $set: req.body });
      res.status(204).send({ message: "Estado atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - falha ao atualizar estado` });
    }
  };

  static deleteEstado = async (req, res) => {
    const id = req.params.id;
    try {
      const estado = await estados.findById(id);

      if (!estado) {
        return res.status(404).send({ message: "Estado não encontrado" });
      }
      await deleteVariasCidades(id);
      await estados.findByIdAndDelete(id);

      res.status(204).send({ message: "Estado deletado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - Falha ao deletar estado`,
      });
    }
  };
}

export default EstadoController;
