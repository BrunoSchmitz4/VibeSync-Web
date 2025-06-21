// src/pages/Playlist.jsx
import { useEffect, useState } from "react";
import styles from "./Playlist.module.css";

function Playlist() {
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
      <div className={styles.playlistContainer}>
        <br />
        <h2 className={styles.playlistTitle}>Suas playlists</h2>
        <section className={styles.playlistSection}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              <img
                src={playlist.images[0]?.url || "https://via.placeholder.com/300"}
                alt={playlist.name}
                className={styles.playlistImage}
              />
              <div className={styles.playlistInfo}>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                {/* <p><strong>Dono:</strong> {playlist.owner.display_name}</p> */}
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
        </section>
      </div>
    </>

  );
}

export default Playlist;
