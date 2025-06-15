import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginButton from "components/LoginButton";

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
  const token = localStorage.getItem("access_token");

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

  // Se deus quiser não vai bugar denovo
  return (
    <nav className={styles.navbarContainer}>
      <h2>
        <Link className={styles.logo} to={"/"}>VibeSync</Link>
      </h2>
      
      <ul className={styles.navList}>
        <li><Link className={styles.navItem} to={"/dashboard"}>Dashboard</Link></li>
        <li><Link className={styles.navItem} to="/criador">Criador</Link></li>
        <li><Link className={styles.navItem} to="/descoberta">Descoberta</Link></li>
        <li><Link className={styles.navItem} to="/playlists">Minhas Playlists</Link></li>
        <li><Link className={styles.navItem} to="/config">Configurações</Link></li>
      </ul>
      <div className={styles.navUserInfo}>
        {/* Se o usuário estiver logado, aparece suas info */}
        {/* <span>Oi, {userName}! bora criar uma playlist pro mood de hoje?</span>
        <button onClick={handleLogout}>Sair</button> */}
        {/* Senão, aparece o botão de login */}
        <LoginButton />
      </div>
    </nav>
  );
}

export default Navbar;
