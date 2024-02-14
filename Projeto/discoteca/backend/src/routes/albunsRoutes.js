import express from "express";
import AlbumController from "../controller/albunsController.js";
import { upload } from "../config/configuracaoMulter.js";

const router = express.Router();

router
  .get("/albuns", AlbumController.listarAlbuns)
  .get("/albuns/:id", AlbumController.listarAlbumPorId)
  .post("/albuns",upload.single("capa"), AlbumController.cadastrarAlbum)
  .put("/albuns/:id", upload.single("capa"), AlbumController.atualizarAlbum)
  .delete("/albuns/:id", AlbumController.deletarAlbum);

export default router;
