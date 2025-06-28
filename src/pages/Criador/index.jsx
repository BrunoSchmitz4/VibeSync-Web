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
      const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userRes.json();
      const userId = userData.id;

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
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <br />
      <h2 className={styles.pageTitle}>Criador de Playlist</h2>
      <br />
      <div className={styles.pageContainer}
      style={{ animationDelay: `${0.2}s` }}>
        <section className={styles.pageSection}>
          <h2 className={styles.sectionTitle}>Qual vibe terá sua nova playlist?</h2>

          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formItem}>
              <label for='titleInput' className={styles.formLabel}>Título:</label>
              <input
                id='titleInput'
                className={styles.formTextInput}
                type="text"
                placeholder="Insira um título..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label for='genderSelect' className={styles.formLabel}>Gênero Musical:</label>
              <select id='genderSelect' value={genre} onChange={(e) => setGenre(e.target.value)} className={styles.formSelect} required>
                <option value="">Selecione</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="electronic">Eletrônica</option>
                <option value="mpb">MPB</option>
                <option value="sertanejo">Sertanejo</option>
              </select>
            </div>
            <div className={styles.formItem}>
              <label for='feelSelect' className={styles.formLabel}>Sentimento:</label>
              <select id='feelSelect' value={mood} onChange={(e) => setMood(e.target.value)} className={styles.formSelect} required>
                <option value="">Selecione</option>
                <option value="feliz">Feliz</option>
                <option value="triste">Triste</option>
                <option value="motivado">Motivado</option>
                <option value="relaxado">Relaxado</option>
              </select>
            </div>            
            <div className={styles.formItem}>
              <label for='playlistSelect' className={styles.formLabel}>Baseado nas suas playlists?</label>
              <select
                id='playlistSelect'
                value={familiarity}
                onChange={(e) => setFamiliarity(e.target.value)}
                className={styles.formSelect}
                required
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            <div className={styles.formItem}>
              <label for='descInput' className={styles.formLabel}>Descrição (opcional):</label>
              <input
                id='descInput'
                className={styles.formTextInputLarge}
                type="text"
                placeholder="Escreva uma descrição..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label for='imgInput' className={styles.formLabel}>Capa (opcional) - JPEG:</label>
              <input
                id='imgInput'
                className={styles.formFileInput}
                type="file"
                accept="image/jpeg"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div> 
            <div className={styles.formItem}>
              <br />
              <button type="submit">Criar Playlist</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Criador;
