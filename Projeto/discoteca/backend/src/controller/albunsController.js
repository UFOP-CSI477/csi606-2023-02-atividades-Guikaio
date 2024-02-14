import albuns from "../models/Album.js";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class AlbumController {
  static cadastrarAlbum = async (req, res) => {
    try {
      const album = new albuns({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        capa: req.file.filename,
        preco: req.body.preco,
        banda: req.body.banda,
      });
      await album.save();
      res.status(201).send(album.toJSON());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar album` });
    }
  };

  static listarAlbuns = async (req, res) => {
    try {
      const colecaoAlbuns = await albuns.find().populate('banda');
      res.status(200).json(colecaoAlbuns);
    } catch (error) {
      res.status(500).send({
        message: `${error.message} - Ocorreu um erro ao buscar os albuns`,
      });
    }
  };

  static listarAlbumPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const album = await albuns.findById(id).populate('banda');
      res.status(200).json(album);
    } catch (error) {
      res.status(404).send({
        message: `${error.message} - Não foi possivel encontrar o album com ID ${id}`,
      });
    }
  };

  static atualizarAlbum = async (req, res) => {
    const id = req.params.id;

    try {
      const album = await albuns.findById(id);
      if (!album) {
        return res.status(404).send({ message: "Álbum não encontrado" });
      }

      let capaPathAntiga;

      if (album.capa && req.file) {
        capaPathAntiga = path.join(__dirname, "../../uploads/", album.capa);
      }

      const updateData = {
        ...(req.body || {}),
        ...(req.file ? { capa: req.file.filename } : {}),
      };
      await albuns.findByIdAndUpdate(id, { $set: updateData });

      if (capaPathAntiga) {
        await fs.unlink(capaPathAntiga);
      }

      res.status(204).send({ message: "Álbum atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao atualizar álbum` });
    }
  };

  static deletarAlbum = async (req, res) => {
    const id = req.params.id;
    try {
      const album = await albuns.findById(id);
      if (!album) {
        return res.status(404).send({ message: "Álbum não encontrado" });
      }
      if (album.capa) {
        const capaPath = path.join(__dirname, "../../uploads/", album.capa);
        await fs.unlink(capaPath);
      }
      await albuns.findByIdAndDelete(id);
      res.status(204).send({ message: "Álbum deletado com sucesso" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao deletar álbum` });
    }
  };
}

export default AlbumController;
