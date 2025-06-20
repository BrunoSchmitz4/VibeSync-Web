// src/hooks/useSpotifyAuth.js
import { useEffect } from "react";

const CLIENT_ID = "1832bd3ad84448e092409e382d6d47ed";
const REDIRECT_URI = "http://127.0.0.1:3000";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

function useSpotifyAuth() {
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
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
      });

      fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Resposta do Spotify:", data);

          if (data.error) {
            console.error("Erro no login Spotify:", data);
            return;
          }

          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          const lastPage = localStorage.getItem("last_page") || "/";
          localStorage.removeItem("last_page");

          window.history.replaceState({}, document.title, lastPage); // limpa URL
          window.location.reload(); // atualiza app
        })
        .catch(error => {
          console.error("Erro ao obter token Spotify:", error);
        });
    }
  }, []);
}

export default useSpotifyAuth;
