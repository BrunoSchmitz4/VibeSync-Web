import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Criador from "./pages/Criador";
import Descoberta from "./pages/Descoberta";
import Playlist from "./pages/Playlist";
import Config from "./pages/Config";
import useSpotifyAuth from "./hooks/useSpotifyAuth";
import Marketplace from "pages/Marketplace";

function AppRoutes() {
  useSpotifyAuth(); // ativa o hook de login no carregamento da aplicação

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="criador" element={<Criador />} />
          <Route path="descoberta" element={<Descoberta />} />
          <Route path="playlists" element={<Playlist />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="config" element={<Config />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
