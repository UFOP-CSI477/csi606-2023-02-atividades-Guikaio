import express from "express";
import CidadesController from "../controller/cidadesController.js";

const router = express.Router();

router
  .get("/cidades", CidadesController.listarCidades)
  .get("/cidades/:id", CidadesController.listarCidadePorId)
  .post("/cidades", CidadesController.cadastrarCidade)
  .put("/cidades/:id", CidadesController.atualizarCidade)
  .delete("/cidades/:id", CidadesController.deleteCidade);

export default router;
