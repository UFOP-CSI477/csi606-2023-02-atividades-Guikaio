import doacoes from "../models/Doacao.js";

class DoacaoController {
  static cadastrarDoacao = async (req, res) => {
    let doacao = new doacoes(req.body);
    try {
      await doacao.save();
      res.status(201).send(doacao.toJSON());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar doação` });
    }
  };

  static listarDoacoes = async (req, res) => {
    try {
      const colecaoDoacoes = await doacoes
        .find()
        .populate({
          path: "pessoa",
          populate: [{ path: "tipoSanguineo" }],
        })
        .populate({
          path: "localColeta",
          populate: [
            {
              path: "cidade",
              populate: [
                {
                  path: "estado",
                },
              ],
            },
          ],
        });
      res.status(200).json(colecaoDoacoes);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar as doações`,
      });
    }
  };

  static listarDoacaoPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const doacao = await doacoes
        .findById(id)
        .populate({
          path: "pessoa",
          populate: [{ path: "tipoSanguineo" }],
        })
        .populate({
          path: "localColeta",
          populate: [
            {
              path: "cidade",
              populate: [
                {
                  path: "estado",
                },
              ],
            },
          ],
        });
      res.status(200).json(doacao);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar a doação com ID ${id}`,
      });
    }
  };

  static atualizarDoacao = async (req, res) => {
    const id = req.params.id;
    try {
      await doacoes.findByIdAndUpdate(id, { $set: req.body });
      res.status(204).send({ message: "Doação atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - falha ao atualizar doacao` });
    }
  };

  static deleteDoacao = async (req, res) => {
    const id = req.params.id;
    try {
      const doacao = await doacoes.findByIdAndDelete(id);

      if (!doacao) {
        res.status(404).send({ message: "Doação não encontrada" });
      }

      res.status(204).send({ message: "Doação deletada com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - Falha ao deletar doação`,
      });
    }
  };

  static deleteDoacaoPorPessoa = async (pessoaId) => {
    try {
      await doacoes.deleteMany({ pessoa: pessoaId });
    } catch (err) {
      console.error(err);
    }
  };

  static deleteDoacaoPorLocalColeta = async (localColetaId) => {
    try {
      await doacoes.deleteMany({ localColeta: localColetaId });
    } catch (err) {
      console.error(err);
    }
  };
}

export default DoacaoController;
