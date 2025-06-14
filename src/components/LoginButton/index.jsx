import React from "react";
import styles from "./LoginButton.module.css";
import { generateRandomString, generateCodeChallenge } from "../../services/pkce";

const CLIENT_ID = "1832bd3ad84448e092409e382d6d47ed";
const REDIRECT_URI = "http://127.0.0.1:3000";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private"
].join(" ");

function LoginButton() {
  const redirectToSpotifyAuth = async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem("spotify_code_verifier", codeVerifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI
    });

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return (
    <button onClick={redirectToSpotifyAuth} className={styles.spotifyButton}>
      Entrar com Spotify
    </button>
  );
}

export default LoginButton;
