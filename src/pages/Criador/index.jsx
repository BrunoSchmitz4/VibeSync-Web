import styles from './Criador.module.css'

function Criador() {
  return (
    <>
      <br />
      <h2 className={styles.pageTitle}>Criador de Playlist</h2>
      <br />
      <div className={styles.pageContainer}>
        <section className={styles.pageSection}>

        </section>
        <section className={styles.pageSection}>
          
        </section>
        {/* A pessoa primeiro escolhe em quê será baseado sua nova playlist */}
        {/* Ela pode dar um título, uma descrição e imagem, se quiser */}
      </div>
    </>
  )
}

export default Criador;
