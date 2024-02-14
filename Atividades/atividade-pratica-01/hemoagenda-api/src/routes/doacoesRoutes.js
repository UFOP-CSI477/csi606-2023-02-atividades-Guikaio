import express from "express";
import DoacoesController from "../controller/doacoesController.js";

const router = express.Router();

router
  .get("/doacoes", DoacoesController.listarDoacoes)
  .get("/doacoes/:id", DoacoesController.listarDoacaoPorId)
  .post("/doacoes", DoacoesController.cadastrarDoacao)
  .put("/doacoes/:id", DoacoesController.atualizarDoacao)
  .delete("/doacoes/:id", DoacoesController.deleteDoacao);

export default router;
