// src/pages/Descoberta.jsx
import styles from "./Descoberta.module.css";
import SpotifyEmbed from "components/SpotifyEmbed"


function Descoberta() {

  const similarTracks = [
    "7DQotDUGnJkXgNJv363GXF",
    "3mJncxEu2NrKYfRvoWiVfm",
    "096gZM7wp5GKHBwtWY3d0z",
    "7o2CTH4ctstm8TNelqjb51"
  ];

  const similarPlaylists = [
    "5TUxgTIxzLbLVh7RUf9V8i",
    "37i9dQZF1DX2sUQwD7tbmL",
    "37i9dQZF1EQn4jwNIohw50",
    "37i9dQZF1DWXMg4uP5o3dm"
  ];

  return (
    <div className={styles.descobertaContainer}>
      <br />
      <section className={styles.descobertaSection}>

        <h2 className={styles.descobertaSectionTitle}>Parecidos com seu estilo</h2>

        <div className={styles.descobertaSectionContent}>
          <div className={styles.descobertaBox}>
            <h3 className={styles.descobertaBoxTitle}>Músicas</h3>
            <div className={styles.descobertaBoxContent}>
              {similarTracks.map((id, index) => (
                <SpotifyEmbed key={id} title={`similarTrack${index}`} src={`https://open.spotify.com/embed/track/${id}`} />
              ))}
            </div>
          </div>
          <div className={styles.descobertaSectionContent}>
            <div className={styles.descobertaBox}>
              <h3 className={styles.descobertaBoxTitle}>Playlists</h3>
              <div className={styles.descobertaBoxContent}>
                {similarPlaylists.map((id, index) => (
                  <SpotifyEmbed key={id} title={`similarPlaylists${index}`} src={`https://open.spotify.com/embed/playlist/${id}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className={styles.descobertaSection}>

        <h2 className={styles.descobertaSectionTitle}>Aleatórios do Spotify</h2>

        <div className={styles.descobertaSectionContent}>
          <div className={styles.descobertaBox}>
            <h3 className={styles.descobertaBoxTitle}>Músicas</h3>
            <div className={styles.descobertaBoxContent}>
              {similarTracks.map((id, index) => (
                <SpotifyEmbed key={id} title={`similarTrack${index}`} src={`https://open.spotify.com/embed/track/${id}`} />
              ))}
            </div>
          </div>
          <div className={styles.descobertaSectionContent}>
            <div className={styles.descobertaBox}>
              <h3 className={styles.descobertaBoxTitle}>Playlists</h3>
              <div className={styles.descobertaBoxContent}>
                {similarPlaylists.map((id, index) => (
                  <SpotifyEmbed key={id} title={`similarPlaylists${index}`} src={`https://open.spotify.com/embed/playlist/${id}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Descoberta;
