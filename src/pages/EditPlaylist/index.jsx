// src/pages/EditPlaylist.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './EditPlaylist.module.css'

function EditPlaylist() {
  const { id } = useParams();
  const token = localStorage.getItem("access_token");

  const [tracks, setTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Buscar músicas da playlist
  useEffect(() => {
    const fetchTracks = async () => {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTracks(data.items);
    };
    fetchTracks();
  }, [id, token]);

  // Excluir música da playlist
  const handleRemove = async (uri) => {
    await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tracks: [{ uri }] }),
    });

    setTracks((prev) => prev.filter((t) => t.track.uri !== uri));
  };

  // Buscar nova música
  const handleSearch = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setSearchResults(data.tracks.items);
  };

  // Adicionar música
  const handleAdd = async (uri) => {
    await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [uri] }),
    });

    setSearchQuery(""); // limpa input
    setSearchResults([]);
    // Atualiza lista de músicas
    window.location.reload();
  };

  return (
    <>
    <br />
        <h2 className={styles.pageTitle}>Editar playlists</h2>
    <br />
    <div className={styles.playlistContainer}>
        <section className={styles.playlistSection}>
            <h2 className={styles.sectionTitle}>Que tal uma nova batida?</h2>
            <input
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque pela música, artista ou letra" className={styles.searchMusicInput}
            />
            <button className={styles.searchMusicBtn} onClick={handleSearch}>Buscar</button>

            {searchResults.map((track) => (
            <div className={styles.musicItemCard} key={track.id}>
                {track.name} — {track.artists.map((a) => a.name).join(", ")}
                <button className={styles.musicItemBtn} onClick={() => handleAdd(track.uri)}>➕</button>
            </div>
            ))}
        </section>
        <section className={styles.playlistSection}>
            <h2 className={styles.sectionTitle}>É disto que tua playlist é feita:</h2>
            {tracks.map(({ track }) => (
            <div className={styles.musicItemCard} key={track.id}>
                {track.name} — {track.artists.map((a) => a.name).join(", ")}
                <button className={styles.musicItemBtn} onClick={() => handleRemove(track.uri)}>❌</button>
            </div>
            ))}
        </section>
    </div>
    </>

  );
}

export default EditPlaylist;
