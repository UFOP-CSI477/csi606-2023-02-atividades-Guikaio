import express from "express";
import BandaControoler from "../controller/bandasController.js";

const router = express.Router();

router
  .get("/bandas", BandaControoler.listarBandas)
  .get("/bandas/:id", BandaControoler.listarBandaPorId)
  .post("/bandas", BandaControoler.cadastrarBanda)
  .put("/bandas/:id", BandaControoler.atualizarBanda)
  .delete("/bandas/:id", BandaControoler.deleteBanda);

export default router;
