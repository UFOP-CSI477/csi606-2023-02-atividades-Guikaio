import express from "express";
import TipoSanguineoController from "../controller/tiposSanguineosController.js";


const router = express.Router();

router
  .get("/tipossanguineos", TipoSanguineoController.listarTiposSanguineos)
  .get("/tipossanguineos/:id", TipoSanguineoController.listarTipoSanguineoPorId)
  .post("/tipossanguineos", TipoSanguineoController.cadastrarTipoSanguineo)
  .put("/tipossanguineos/:id", TipoSanguineoController.atualizarTipoSanguineo)
  .delete("/tipossanguineos/:id", TipoSanguineoController.deleteTipoSanguineo);

export default router;
