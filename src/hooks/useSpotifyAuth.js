import { useEffect, useState } from 'react';

function useSpotifyAuth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let tokenFromStorage = window.localStorage.getItem("spotifyToken");

    if (!tokenFromStorage && hash) {
      const _token = hash.substring(1).split("&").find(item => item.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("spotifyToken", _token);
      tokenFromStorage = _token;
    }

    setToken(tokenFromStorage);
  }, []);

  return token;
}

export default useSpotifyAuth;
