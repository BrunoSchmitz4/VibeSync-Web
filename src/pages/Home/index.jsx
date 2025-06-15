import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import styles from './Home.module.css'
import imgMusics from '../../assets/ImageWallpaperSpotifyMusics.jpg' 

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
      <br />
      <div className={styles.homeContainer}>
        {/* <h1 className={styles.homeTitle}>Bem-vindo à VibeSync</h1> */}
        <div className={styles.homeCardLarge}>
            <h2 className={styles.homeCardLargeTitle}>O que é o VibeSync?</h2>
            <span className={styles.homeCardLargeContent}>
                <p className={styles.homeCardLargeDesc}>"O VibeSync é uma aplicação web feita para ajudar você à criar adicionar novas playlists de música à sua rotina diária. Seja criando novas do zero, ou simplesmente descobrindo outras já prontas, apenas aguardando para serem ouvidas.
                  VibeSync foi desenvolvida em React (isso significa estilo, segurança e performance, viu? 😉🎶)."</p>
                <img className={styles.homeCardLargeImg} src={imgMusics} alt="Imagem de Álbum" />
            </span>
        </div>
        <iframe title="Spotify Hipsters.Tech Podcast iFrame" src="https://open.spotify.com/embed/show/2p0Vx75OmfsXktyLBuLuSf?utm_source=generator&theme=0" width="65%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <section className={styles.homeSection}>
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
      </div>
    </>
  );
}

export default Home;
