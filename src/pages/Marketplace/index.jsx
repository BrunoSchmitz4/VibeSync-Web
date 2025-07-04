// src/pages/Marketplace/index.jsx
import { useEffect, useState } from "react";
import styles from "./Marketplace.module.css";
import ArtistSection from "components/ArtistSection";
import useSpotifyAuth from "../../hooks/useSpotifyAuth";

function Marketplace() {
  const token = useSpotifyAuth();
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  // Verifica se a loja do artista existe via HEAD request
  const checkArtistShop = async (artistId) => {
    try {
      const res = await fetch(`https://shop.spotify.com/artist/${artistId}`, {
        method: "HEAD",
        mode: "no-cors", // ignora CORS (pode variar conforme política do navegador)
      });
      return true; // assume que existe (pois HEAD com no-cors não retorna erro visível)
    } catch {
      return false;
    }
  };

  // Carrega os artistas mais ouvidos
  useEffect(() => {
    document.title = "VibeSync | Marketplace";
    if (!token) return;

    const fetchTopArtistsWithShop = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.spotify.com/v1/me/top/artists?limit=20", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const validArtists = [];
        for (const artist of data.items) {
          const hasShop = await checkArtistShop(artist.id);
          if (hasShop) validArtists.push(artist);
          if (validArtists.length >= 10) break;
        }

        setArtists(validArtists);
      } catch (err) {
        console.error("Erro ao buscar artistas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtistsWithShop();
  }, [token]);

  // Busca por artista
  const handleSearch = async () => {
    if (!search) return;
    setAlert("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=artist&limit=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      const artist = data.artists?.items?.[0];

      if (!artist) {
        setAlert("Artista não encontrado.");
        return;
      }

      const hasShop = await checkArtistShop(artist.id);
      if (!hasShop) {
        setAlert(`O artista "${artist.name}" não possui loja disponível.`);
        return;
      }

      setArtists([artist]); // apenas artista pesquisado
    } catch (err) {
      console.error("Erro ao buscar artista:", err);
      setAlert("Erro na busca.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <h2 className={styles.pageTitle}>Marketplace dos Artistas</h2>
      <br />
      <div className={styles.marketContainer}>
        <div className={styles.marketSection}>
          <h2 className={styles.sectionTitle}>Procurando alguém em específico?</h2>
          <input
            type="text" placeholder="Buscar artista por nome" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.marketSectionInput}
          />
          <button className={styles.marketSectionBtn} onClick={handleSearch}>Buscar</button>
        </div>
        <div className={styles.marketSection}>
          <h2 className={styles.sectionTitle}>Artistas</h2>
          {alert && <p className={styles.alert}>{alert}</p>}
          {loading ? (
            <p className={styles.loading}>Carregando dados dos artistas...</p>
          ) : (
            <div className={styles.marketplaceContainer}>
              {artists.map((artist, index) => (
                <ArtistSection
                  key={artist.id}
                  artist={artist}
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>


      
    </>
  );
}

export default Marketplace;
