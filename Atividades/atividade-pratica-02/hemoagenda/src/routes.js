import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home"
import Doacao from "./pages/Doacao"
import LocaisColeta from "./pages/LocaisColeta"
import LocalColeta from "./pages/LocalColeta"
import CadastrosGerais from "./pages/CadastrosGerais"
import Pessoa from "./pages/Pessoa"
import Pessoas from "./pages/Pessoas"

export default function AppRoutes() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/doacoes/:id" element={<Doacao/>} />
          <Route path="/locaiscoleta" element={<LocaisColeta/>} />
          <Route path="/locaiscoleta/:id" element={<LocalColeta/>} />
          <Route path="/cadastrosgerais" element={<CadastrosGerais/>} />
          <Route path="/pessoas" element={<Pessoas/>} />
          <Route path="/pessoas/:id" element={<Pessoa/>} />
          <Route />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
