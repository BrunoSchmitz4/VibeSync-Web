// src/components/Navbar.js
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginButton from "components/LoginButton";

function Navbar() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Token inválido. Removendo.");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return;
        }

        const data = await res.json();
        setUserName(data.display_name || "Usuário");
      } catch (e) {
        console.error("Erro ao buscar usuário:", e);
      }
    };

    fetchUser();
  }, [token]);

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
        {token ? (
          <>
            <span>Tudo na paz, {userName}?</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
