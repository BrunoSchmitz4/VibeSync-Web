// src/pages/Criador/index.jsx
import { useState } from 'react';
import styles from './Criador.module.css';

function Criador() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [familiarity, setFamiliarity] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem('access_token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔸 1. Buscar o ID do usuário
      const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userRes.json();
      const userId = userData.id;

      // 🔸 2. Criar playlist
      const createRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          public: true,
        }),
      });

      const playlistData = await createRes.json();
      const playlistId = playlistData.id;

      // 🔸 3. Enviar imagem (se houver)
      if (imageFile) {
        const base64 = await toBase64(imageFile);

        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'image/jpeg',
          },
          body: base64,
        });
      }

      alert('Playlist criada com sucesso!');
      window.location.href = '/playlists';
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
      alert('Erro ao criar playlist.');
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // remove o prefixo data:image/jpeg;base64,
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <br />
      <h2 className={styles.pageTitle}>Criador de Playlist</h2>
      <br />
      <div className={styles.pageContainer}>
        <section className={styles.pageSection}>
          <h2 className={styles.sectionTitle}>Qual vibe terá sua nova playlist?</h2>

          <form onSubmit={handleSubmit}>
            <label className={styles.formLabel}>Título:</label>
            <input
              className={styles.formTextInput}
              type="text"
              placeholder="Insira um título..."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className={styles.formLabel}>Gênero Musical:</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)} className={styles.formSelect} required>
              <option value="">Selecione</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip-Hop</option>
              <option value="electronic">Eletrônica</option>
              <option value="mpb">MPB</option>
              <option value="sertanejo">Sertanejo</option>
            </select>

            <label className={styles.formLabel}>Sentimento:</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} className={styles.formSelect} required>
              <option value="">Selecione</option>
              <option value="feliz">Feliz</option>
              <option value="triste">Triste</option>
              <option value="motivado">Motivado</option>
              <option value="relaxado">Relaxado</option>
            </select>

            <label className={styles.formLabel}>Baseado nas suas playlists?</label>
            <select
              value={familiarity}
              onChange={(e) => setFamiliarity(e.target.value)}
              className={styles.formSelect}
              required
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>

            <label className={styles.formLabel}>Descrição (opcional):</label>
            <input
              className={styles.formTextInput}
              type="text"
              placeholder="Escreva uma descrição..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className={styles.formLabel}>Capa (opcional - JPEG):</label>
            <input
              className={styles.formFileInput}
              type="file"
              accept="image/jpeg"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <br />
            <button type="submit">Criar Playlist</button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Criador;
