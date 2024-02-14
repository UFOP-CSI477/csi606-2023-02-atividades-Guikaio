import express from "express";
import PessoaController from "../controller/pessoasController.js";


const router = express.Router();

router
  .get("/pessoas", PessoaController.listarPessoas)
  .get("/pessoas/:id", PessoaController.listarPessoaPorId)
  .post("/pessoas", PessoaController.cadastrarPessoa)
  .put("/pessoas/:id", PessoaController.atualizarPessoa)
  .delete("/pessoas/:id", PessoaController.deletePessoa);

export default router;
