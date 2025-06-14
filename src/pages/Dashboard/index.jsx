import useSpotifyAuth from '../../hooks/useSpotifyAuth';

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {token ? (
        <h2>Logado com Spotify! Token recebido com sucesso.</h2>
      ) : (
        <h2>Faça login para acessar o Dashboard.</h2>
      )}
    </div>
  );
}

export default Dashboard;
