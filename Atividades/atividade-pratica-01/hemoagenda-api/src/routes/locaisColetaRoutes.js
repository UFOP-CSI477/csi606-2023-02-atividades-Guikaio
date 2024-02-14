import express from "express";
import LocaisColetaController from "../controller/locaisColetaController.js";

const router = express.Router();

router
  .get("/locaiscoleta", LocaisColetaController.listarLocaisColeta)
  .get("/locaiscoleta/:id", LocaisColetaController.listarLocalColetaPorId)
  .post("/locaiscoleta", LocaisColetaController.cadastrarLocalColeta)
  .put("/locaiscoleta/:id", LocaisColetaController.atualizarLocalColeta)
  .delete("/locaiscoleta/:id", LocaisColetaController.deleteLocalColeta);

export default router;
