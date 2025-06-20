// src/components/SpotifyEmbed.jsx
import React from "react";

const SpotifyEmbed = React.memo(({ src, title }) => {
  return (
    <iframe
      title={title}
      src={src}
      width="40%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
});

export default SpotifyEmbed;
