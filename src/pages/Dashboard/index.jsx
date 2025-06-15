import Navbar from 'components/Navbar';
import useSpotifyAuth from '../../hooks/useSpotifyAuth';
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
  const token = useSpotifyAuth();

  return (
    <>
    <Navbar />
    <div className={styles.dashboardContainer}>
      <br />
      <section className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>Suas playlists</h2>
        {/* Aqui vamos mostrar as playlists do usuário */}
      </section>
      <section className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>O Melhor de Cada Artista</h2>
        {/* Aqui vamos mostrar o This is de dos 6 artistas favoritos do usuário */}
      </section>
      <section className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>#EssaÉTuaVibe</h2>
        {/* Aqui vamos mostrar músicas parecidas com o gosto musical do usuário */}
      </section>
      <section className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>Já Ouviu Essas?</h2>
        {/* Aqui vamos recomendar 6 músicas aleatórias para o usuário, vai que cola? */}
      </section>
      {token ? (
        <div className={styles.dashBoardAlertSuccess}>
          <h2>Logado com Spotify! Token recebido com sucesso.</h2>
        </div>

      ) : (
        <div className={styles.dashBoardAlertWarning}>
          <h2>Faça login para acessar o Dashboard.</h2>
        </div>
      )}
    </div>
    </>

  );
}

export default Dashboard;
