import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoginButton from "../../components/LoginButton";
import Navbar from "components/Navbar";
import styles from './Home.module.css'

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    // Já está autenticado?
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      navigate("/dashboard");
      return;
    }

    // Fazer troca do código por access token
    if (code && codeVerifier) {
      fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, codeVerifier })
      })
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            console.log("Access token recebido:", data);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token); // se vier
            localStorage.removeItem("code_verifier"); // limpeza
            navigate("/dashboard");
          } else {
            console.error("Erro ao obter access token:", data);
          }
        })
        .catch(err => console.error("Erro na requisição:", err));
    }
  }, [searchParams, navigate]);

  return (
    <>
      <Navbar />
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>Bem-vindo à VibeSync</h1>
        <p>Crie playlists baseadas no seu humor e descubra novos sons com facilidade.</p>
        <section className={styles.homeSection}>
          {/* <div className={styles.homeCard}>
            <h2 className={styles.homeCardTitle}>O que é o VibeSync?</h2>
            <span className={styles.homeCardDesc}>
              O VibeSync é uma aplicação web que te ajuda à criar playlists para o Spotify!
            </span>
          </div> */}
          <div className={styles.homeCard}>
            <h2 className={styles.homeCardTitle}>Dashboard</h2>
            <span className={styles.homeCardDesc}>
                <p>No Dashboard você pode gerenciar as playlists criadas por você</p>
            </span>
          </div>
          <div className={styles.homeCard}>
            <h2 className={styles.homeCardTitle}>Criador</h2>
            <span className={styles.homeCardDesc}>
                <p>Em Criador, você poderá criar novas playlists, basta dar um tema e um título, nós faremos o resto.</p>
            </span>
          </div>
          <div className={styles.homeCard}>
            <h2 className={styles.homeCardTitle}>Descoberta</h2>
            <span className={styles.homeCardDesc}>
                <p>Afim de novidade? Sem problemas. Em Descoberta, você verá várias playlists diferentes. Escolha a do seu agrado.</p>
            </span>
          </div>
          <div className={styles.homeCard}>
            <h2 className={styles.homeCardTitle}>Minhas Playlist</h2>
            <span className={styles.homeCardDesc}>
                <p>Você pode gerenciar suas playlist, editar a mixtape, dar um novo significado ou simplesmente excluir ela. Você quem escolhe!</p>
            </span>
          </div>
        </section>
        <LoginButton />
      </div>
    </>
  );
}

export default Home;
