import express from "express";
import cidades from "./cidadesRoutes.js";
import doacoes from "./doacoesRoutes.js";
import estados from "./estadosRoutes.js";
import locaisColeta from "./locaisColetaRoutes.js";
import pessoas from "./pessoasRoutes.js";
import tiposSanguineos from "./tiposSanguineosRoutes.js";


const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Discoteca" });
  });

  app.use(express.json(), cidades, doacoes, estados, locaisColeta, pessoas, tiposSanguineos);
};

export default routes;
