import styles from './ArtistSection.module.css'

function ArtistSection({ artist, style }) {
  return (
    <div className={styles.artistCard} style={style}>
      <img
        src={artist.images?.[0]?.url}
        alt={artist.name}
        width="200"
        height="200"
        className={styles.artistCardImg}
      />
      <h3 className={styles.artistCardName}>{artist.name}</h3>
      <div className={styles.artistCardGroup}>
        <a
          href={`https://open.spotify.com/artist/${artist.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.artistCardBtnLeft}
        >
          Ver Perfil
        </a>
        <a
          href={`https://open.spotify.com/artist/${artist.id}/concerts`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.artistCardBtnRight}
        >
          Ver Shows
        </a>
      </div>
    </div>
  );
}

export default ArtistSection;
