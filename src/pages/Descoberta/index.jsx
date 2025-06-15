import Navbar from 'components/Navbar';
import styles from './Descoberta.module.css'

function Descoberta() {
  return (
    <>
      <Navbar />
      <br />
      <h2>Já escutou essas?</h2>
      <div className={styles.descobertaContainer}>
        <iframe className={styles.spotifyPlaylist} src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3RTz58?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe className={styles.spotifyPlaylist} src="https://open.spotify.com/embed/artist/0p4nmQO2msCgU4IF37Wi3j?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe className={styles.spotifyPlaylist} src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO4bwDxS?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </>
  )
}

export default Descoberta;
