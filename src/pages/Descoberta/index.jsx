// src/pages/Descoberta.jsx
import styles from "./Descoberta.module.css";
import SpotifyEmbed from "components/SpotifyEmbed"
import { useEffect } from "react";

function Descoberta() {

  const similarTracks = [
    "096gZM7wp5GKHBwtWY3d0z",
    "7o2CTH4ctstm8TNelqjb51"
  ];

  const similarPlaylists = [
    "37i9dQZF1EQn4jwNIohw50",
    "37i9dQZF1DWXMg4uP5o3dm"
  ];

  const newTracks = [
    "7DQotDUGnJkXgNJv363GXF",
    "3mJncxEu2NrKYfRvoWiVfm"
  ];

  const newPlaylists = [
    "5TUxgTIxzLbLVh7RUf9V8i",
    "37i9dQZF1DX2sUQwD7tbmL"
  ];

  useEffect(() => {
      document.title = "VibeSync | Descoberta";
  }, []);

  return (
    <>
    <br />
    <h2 className={styles.pageTitle}>Descoberta</h2>
    <br />
      <div className={styles.pageContainer}>
        <section className={styles.pageSection}>
          <h2 className={styles.sectionTitle}>Parecidos com seu estilo</h2>
          <div className={styles.pageBox}>
            <h3 className={styles.boxTitle}>Músicas</h3>
            <div className={styles.pageContent}>
              <div className={styles.descobertaBoxContent}>
                {similarTracks.map((id, index) => (
                  <SpotifyEmbed key={id} title={`similarTrack${index}`} src={`https://open.spotify.com/embed/track/${id}`} />
                ))}
              </div>
            </div>
          <div className={styles.pageBox}>
              <h3 className={styles.boxTitle}>Playlists</h3>
              <div className={styles.pageContent}>
                <div className={styles.descobertaBoxContent}>
                  {similarPlaylists.map((id, index) => (
                    <SpotifyEmbed key={id} title={`similarPlaylists${index}`} src={`https://open.spotify.com/embed/playlist/${id}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.pageSection}>
          <h2 className={styles.sectionTitle}>Aleatórias do Spotify</h2>
          <div className={styles.pageBox}>
            <h3 className={styles.boxTitle}>Músicas</h3>
            <div className={styles.pageContent}>
              <div className={styles.descobertaBoxContent}>
                {newTracks.map((id, index) => (
                  <SpotifyEmbed key={id} title={`newTracks${index}`} src={`https://open.spotify.com/embed/track/${id}`} />
                ))}
              </div>
            </div>
          <div className={styles.pageBox}>
              <h3 className={styles.boxTitle}>Playlists</h3>
              <div className={styles.pageContent}>
                <div className={styles.descobertaBoxContent}>
                  {newPlaylists.map((id, index) => (
                    <SpotifyEmbed key={id} title={`newPlaylists${index}`} src={`https://open.spotify.com/embed/playlist/${id}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>

  );
}

export default Descoberta;
