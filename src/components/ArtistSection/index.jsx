// src/components/ArtistSection/index.jsx
import styles from "./ArtistSection.module.css";
import ProductCard from "components/ProductCard";

function ArtistSection({ artist }) {
  const products = [
    {
      name: `Álbum "Essenciais de ${artist.name}"`,
      image: artist.images[0]?.url,
      url: artist.external_urls.spotify,
    },
    {
      name: `Camiseta "${artist.name} World Tour"`,
      image: artist.images[1]?.url || artist.images[0]?.url,
      url: artist.external_urls.spotify,
    },
    {
      name: `Ingressos para show de ${artist.name}`,
      image: artist.images[2]?.url || artist.images[0]?.url,
      url: artist.external_urls.spotify,
    },
  ];

  return (
<section className={styles.artistSection}>
  <img
    className={styles.artistImage}
    src={artist.images[0]?.url}
    alt={`Foto de ${artist.name}`}
  />

  <div className={styles.artistContent}>
    <h2 className={styles.artistName}>{artist.name}</h2>
    <div className={styles.productList}>
      {products.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
    </div>
  </div>
</section>
  );
}

export default ArtistSection;