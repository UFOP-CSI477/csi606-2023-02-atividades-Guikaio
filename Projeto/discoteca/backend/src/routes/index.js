import express from "express";
import albuns from "./albunsRoutes.js";
import bandas from "./bandasRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Discoteca" });
  });

  app.use(express.json(), albuns, bandas);
};

export default routes;
