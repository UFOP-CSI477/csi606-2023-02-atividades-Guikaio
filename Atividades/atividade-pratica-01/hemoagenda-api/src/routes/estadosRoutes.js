import express from "express";
import EstadoController from "../controller/estadosController.js";

const router = express.Router();

router
  .get("/estados", EstadoController.listarEstados)
  .get("/estados/:id", EstadoController.listarEstadoPorId)
  .post("/estados", EstadoController.cadastrarEstado)
  .put("/estados/:id", EstadoController.atualizarEstado)
  .delete("/estados/:id", EstadoController.deleteEstado);

export default router;
