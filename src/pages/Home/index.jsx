// src/pages/Home.jsx
import { useEffect } from "react";
import styles from './Home.module.css';
import imgMusics from '../../assets/ImageWallpaperSpotifyMusics.jpg';

function Home() {
  useEffect(() => {
    document.title = "VibeSync | Início";
  }, []);

  return (
    <>
      <br />
      <h2 className={styles.pageTitle}>Bem-vindo(a)</h2>
      <br />
      <div className={styles.pageContainer}>
        <section className={styles.pageSection}>
          <div className={styles.pageBox}>
            <div className={styles.pageContent}>
              <h2 className={styles.contentTitle}>O que é o VibeSync?</h2>
              <span className={styles.contentSpan}>
                <p className={styles.contentText}>
                  "O VibeSync é uma aplicação web feita para ajudar você a criar e adicionar novas playlists de música à sua rotina diária. Seja criando novas do zero, ou descobrindo outras já prontas — apenas aguardando para serem ouvidas."
                </p>
                <img className={styles.homeCardLargeImg} src={imgMusics} alt="Imagem de Álbum" />
              </span>
            </div>
          </div>
          <iframe
            className={styles.pageIframe}
            title="Spotify Hipsters.Tech Podcast iFrame"
            src="https://open.spotify.com/embed/show/2p0Vx75OmfsXktyLBuLuSf?utm_source=generator&theme=0"
            width="65%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"></iframe>
        </section>
        <section className={styles.pageSection}>
          <div className={styles.cardContainer}>
              {[
                {
                  title: "Dashboard",
                  desc: "No Dashboard você pode gerenciar as playlists criadas por você"
                },
                {
                  title: "Criador",
                  desc: "Em Criador, você poderá criar novas playlists, basta dar um tema e um título, nós faremos o resto."
                },
                {
                  title: "Descoberta",
                  desc: "Afim de novidade? Sem problemas. Em Descoberta, você verá várias playlists diferentes. Escolha a do seu agrado."
                },
                {
                  title: "Minhas Playlist",
                  desc: "Você pode gerenciar suas playlists, editar a mixtape, dar um novo significado ou simplesmente excluir ela. Você quem escolhe!"
                }
              ].map((card, index) => (
                <div key={index} className={styles.homeCard}>
                  <h2 className={styles.homeCardTitle}>{card.title}</h2>
                  <span className={styles.homeCardDesc}>
                    <p>{card.desc}</p>
                  </span>
                </div>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
