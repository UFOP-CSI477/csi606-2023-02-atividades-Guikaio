import locaiscoleta from "../models/LocalColeta.js";
import locaisColeta from "../models/LocalColeta.js";

class LocalColetaController {
  static cadastrarLocalColeta = async (req, res) => {
    let localColeta = new locaisColeta(req.body);
    try {
      await localColeta.save();
      res.status(201).send(localColeta.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `${error.message} - falha ao cadastrar local de coleta`,
      });
    }
  };

  static listarLocaisColeta = async (req, res) => {
    try {
      const colecaoLocaisColeta = await locaisColeta.find().populate({
        path: "cidade",
        populate: [
          {
            path: "estado",
          },
        ],
      });
      res.status(200).json(colecaoLocaisColeta);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar as local de coleta`,
      });
    }
  };

  static listarLocalColetaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const localColeta = await locaisColeta.findById(id).populate({
        path: "cidade",
        populate: [
          {
            path: "estado",
          },
        ],
      });
      res.status(200).json(localColeta);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar a local de coleta com ID ${id}`,
      });
    }
  };

  static atualizarLocalColeta = async (req, res) => {
    const id = req.params.id;
    try {
      await locaisColeta.findByIdAndUpdate(id, { $set: req.body });
      res
        .status(204)
        .send({ message: "Local de coleta atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - falha ao atualizar local de coleta`,
      });
    }
  };

  static deleteLocalColeta = async (req, res) => {
    const id = req.params.id;
    try {
      const localColeta = await locaiscoleta.findById(id);
      if (!localColeta) {
        res.status(404).send({ message: "Local de coleta não encontrado" });
      }

      await deleteVariasDoacoes("pessoa", id);
      await locaiscoleta.findByIdAndDelete(id);

      res.status(204).send({ message: "Local de coleta deletada com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - Falha ao deletar local de coleta`,
      });
    }
  };
}

export default LocalColetaController;
