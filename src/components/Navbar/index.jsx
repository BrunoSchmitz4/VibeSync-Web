import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


/**
 * 
 * @returns Componente Navbar()
 * @description Vai exibir o Navbar com a logo VibeSync e
 * uma lista de abas para serem navegadas.
 * Abas que aparecem: Dashboard | Criador | Descoberta | Playlists | Config
 * Além disso, se o usuário já estiver logado, 
 * aparecerá o nome dele (Conta do Spotify) e um botão pra deslogar
 * @author BruninSchmitz4
 */
function Navbar() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserName(data.display_name || "Usuário");
    };

    fetchUser();
  }, []);

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>VibeSync</h2>
      <ul className={styles.navList}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/criador">Criador</Link></li>
        <li><Link to="/descoberta">Descoberta</Link></li>
        <li><Link to="/playlists">Minhas Playlists</Link></li>
        <li><Link to="/config">Config</Link></li>
      </ul>
      <div className={styles.userInfo}>
        <span>{userName}</span>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;
