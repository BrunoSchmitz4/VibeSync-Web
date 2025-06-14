import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Criador from "./pages/Criador";
import Descoberta from "./pages/Descoberta";
import Playlist from "./pages/Playlist";
import Config from "./pages/Config";

function AppRoutes() {
  const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
    {/* {!token && <Header />} */}
      {token && <Navbar />} {/* Exibe só após login */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/criador" element={<Criador />} />
        <Route path="/descoberta" element={<Descoberta />} />
        <Route path="/playlists" element={<Playlist />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
