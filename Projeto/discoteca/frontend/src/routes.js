import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import UpdateAlbum from "./pages/UpdateAlbum/index";
import AddAlbum from "./pages/AddAlbum/index";
import Bandas from "./pages/Bandas";
import Navbar from "./components/NavBar";

export default function AppRoutes() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adicionaralbum" element={<AddAlbum />} />
          <Route path="/atualizaralbum/:id" element={<UpdateAlbum />} />
          <Route path="/bandas" element={<Bandas />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
