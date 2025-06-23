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
    <br />
    <h2 className={styles.pageTitle}>Dashboard</h2>
    <br />
    <div className={styles.pageContainer}>
      <br />
      <section className={styles.pageSection}>
        <div className={styles.pageBox}>
          <h2 className={styles.dashboardSectionTitle}>Suas playlists</h2>
        </div>
      </section>
      <section className={styles.pageSection}>
        <div className={styles.pageBox}>
          <h2 className={styles.dashboardSectionTitle}>O Melhor de Cada Artista</h2>
        </div>
      </section>
      <section className={styles.pageSection}>
        <div className={styles.pageBox}>
          <h2 className={styles.dashboardSectionTitle}>#EssaÉTuaVibe</h2>
        </div>
      </section>
      <section className={styles.pageSection}>
        <div className={styles.pageBox}>
          <h2 className={styles.dashboardSectionTitle}>Já Ouviu Essas?</h2>
        </div>
      </section>
      <section className={styles.pageSection}>
        <div className={styles.pageBox}>
          {/* Teste de Token */}
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
      </section>
    </div>
    </>

  );
}

export default Dashboard;
