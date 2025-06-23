import useSpotifyAuth from '../../hooks/useSpotifyAuth';
import { useEffect, useState } from "react";
import styles from './Dashboard.module.css'

/**
 * 
 * @returns Componente Dashboard()
 * @description Caso o usuário: 
 * Estiver logado na conta do Spotify dele: 
 * - Vai aparecer um dashboard de informações pra ele.
 * Caso contrário:
 * - Pedirá pra fazer login
 * @author BruninSchmitz4
 */
function Dashboard() {
  const tokenAuth = useSpotifyAuth();

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.items) {
          const ordered = data.items.sort((a, b) =>
            b.snapshot_id.localeCompare(a.snapshot_id)
          );
          setPlaylists(ordered);
        } else {
          console.error("Erro ao carregar playlists:", data);
        }
      } catch (err) {
        console.error("Erro na requisição:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [token]);

  if (loading) return <p className={styles.loading}>Carregando playlists...</p>;

  return (
    <>
    <br />
    <h2 className={styles.pageTitle}>Dashboard</h2>
    <br />
    <div className={styles.pageContainer}>
      <section className={styles.pageSection}>
        <div className={styles.sectionTitle}>Suas playlists</div>
        <div className={styles.pageBox}>
            {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              {playlist.images?.[0]?.url && (
                <img src={playlist.images[0].url} alt={playlist.name} />
              )}
              <div className={styles.playlistInfo}>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                <p><strong>Músicas:</strong> {playlist.tracks.total}</p>
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openBtn}
                >
                  Abrir no Spotify
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.pageSection}>
        <div className={styles.sectionTitle}>O Melhor de Cada Artista</div>
        <div className={styles.pageBox}>
            {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              {playlist.images?.[0]?.url && (
                <img src={playlist.images[0].url} alt={playlist.name} />
              )}
              <div className={styles.playlistInfo}>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                <p><strong>Músicas:</strong> {playlist.tracks.total}</p>
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openBtn}
                >
                  Abrir no Spotify
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.pageSection}>
        <div className={styles.sectionTitle}>#EssaÉTuaVibe</div>
        <div className={styles.pageBox}>
            {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              {playlist.images?.[0]?.url && (
                <img src={playlist.images[0].url} alt={playlist.name} />
              )}
              <div className={styles.playlistInfo}>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                <p><strong>Músicas:</strong> {playlist.tracks.total}</p>
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openBtn}
                >
                  Abrir no Spotify
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.pageSection}>
        <div className={styles.sectionTitle}>Já Ouviu Essas?</div>
        <div className={styles.pageBox}>
            {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              {playlist.images?.[0]?.url && (
                <img src={playlist.images[0].url} alt={playlist.name} />
              )}
              <div className={styles.playlistInfo}>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                <p><strong>Músicas:</strong> {playlist.tracks.total}</p>
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openBtn}
                >
                  Abrir no Spotify
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className={styles.pageSection}>
        <div className={styles.pageBox}>
          {tokenAuth ? (
            <div className={styles.dashBoardAlertSuccess}>
              <h2>Logado com Spotify! Token recebido com sucesso.</h2>
            </div>

          ) : (
            <div className={styles.dashBoardAlertWarning}>
              <h2>Faça login para acessar o Dashboard.</h2>
            </div>
          )}
        </div>
      </section> */}
    </div>
    </>

  );
}

export default Dashboard;
