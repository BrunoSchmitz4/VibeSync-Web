import { useEffect, useState } from "react";

function useSpotifyAuth() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !localStorage.getItem("access_token")) {
      const codeVerifier = localStorage.getItem("spotify_code_verifier");

      if (!codeVerifier) {
        console.error("Code Verifier não encontrado no localStorage.");
        return;
      }

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://127.0.0.1:3000",
        client_id: "1832bd3ad84448e092409e382d6d47ed",
        code_verifier: codeVerifier,
      });

      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.error("Erro no login Spotify:", data);
            return;
          }

          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          setToken(data.access_token); // ✅ atualiza estado local

          const lastPage = localStorage.getItem("last_page") || "/";
          localStorage.removeItem("last_page");

          window.history.replaceState({}, document.title, lastPage);
          window.location.reload(); // recarrega app com token
        })
        .catch(error => {
          console.error("Erro ao obter token Spotify:", error);
        });
    }
  }, []);

  return token;
}

export default useSpotifyAuth;
