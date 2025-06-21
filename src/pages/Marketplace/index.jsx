// src/pages/Marketplace/index.jsx
import { useEffect, useState } from "react";
import styles from "./Marketplace.module.css";
import ArtistSection from "components/ArtistSection";
import useSpotifyAuth from "../../hooks/useSpotifyAuth";

function Marketplace() {
  const token = useSpotifyAuth();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.items || []);
      })
      .catch((err) => console.error("Erro ao buscar artistas:", err));
  }, [token]);

  return (
    <div className={styles.marketplaceContainer}>
      <h1 className={styles.marketplaceTitle}>Marketplace de Artistas</h1>
      {artists.map((artist, index) => (
        <ArtistSection
          key={artist.id}
          artist={artist}
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export default Marketplace;
