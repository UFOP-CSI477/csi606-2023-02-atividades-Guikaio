import bandas from "../models/Bnada.js";
import albuns from "../models/Album.js"
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BandaController {
  static cadastrarBanda = async (req, res) => {
    let banda = new bandas(req.body);
    try {
      await banda.save();
      res.status(201).send(banda.toJSON());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar banda` });
    }
  };

  static listarBandas = async (req, res) => {
    try {
      const colecaoBandas = await bandas.find();
      res.status(200).json(colecaoBandas);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar as bandas`,
      });
    }
  };

  static listarBandaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const banda = await bandas.findById(id);
      res.status(200).json(banda);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar a banda com ID ${id}`,
      });
    }
  };

  static atualizarBanda = async (req, res) => {
    const id = req.params.id;
    try {
      await bandas.findByIdAndUpdate(id, { $set: req.body });
      res.status(204).send({ message: "Banda atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - falha ao atualizar banda` });
    }
  };

  static deleteBanda = async (req, res) => {
    const id = req.params.id;
    try {
      const banda = await bandas.findByIdAndDelete(id);

      if (!banda) {
        return res.status(404).send({ message: "Banda não encontrada" });
      }
      const albunsDaBanda = await albuns.find({ banda: id });
      
      await Promise.all(
        albunsDaBanda.map(async (album) => {
          if (album.capa) {
            const capaPath = path.join(__dirname, "../../uploads/", album.capa);
            await fs.unlink(capaPath);
          }
        })
      );

      await albuns.deleteMany({ banda: id });

      res
        .status(204)
        .send({ message: "Banda, álbuns e imagens deletados com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: `${err.message} - Falha ao deletar banda, álbuns e imagens`,
      });
    }
  };
}

export default BandaController;
