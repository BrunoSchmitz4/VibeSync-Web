import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoginButton from "../../components/LoginButton";

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    // Já está autenticado?
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      navigate("/dashboard");
      return;
    }

    // Fazer troca do código por access token
    if (code && codeVerifier) {
      fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, codeVerifier })
      })
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            console.log("Access token recebido:", data);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token); // se vier
            localStorage.removeItem("code_verifier"); // limpeza
            navigate("/dashboard");
          } else {
            console.error("Erro ao obter access token:", data);
          }
        })
        .catch(err => console.error("Erro na requisição:", err));
    }
  }, [searchParams, navigate]);

  return (
    <>
      <div className="homeContainer">
        <h1>Bem-vindo à VibeSync</h1>
        <p>Crie playlists baseadas no seu humor e descubra novos sons com facilidade.</p>

        {/* <LoginButton /> */}
      </div>
    </>
  );
}

export default Home;
