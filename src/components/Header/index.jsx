import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import LoginButton from "../LoginButton";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        VibeSync
      </div>
      <nav>
        {!token ? (
          <LoginButton />
        ) : (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sair
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
