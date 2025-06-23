import { useEffect, useState } from "react";
import styles from "./Config.module.css";

function Config() {
  const [theme, setTheme] = useState("dark"); // tema padrão
  // const [daltonic, setDaltonic] = useState(false);

  // Carrega o tema salvo no carregamento da página
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // Atualiza o tema no body e salva no localStorage
  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    document.body.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <>
      <br />
      <h2 className={styles.configTitle}>Configurações</h2>
      <br />
      <div className={styles.configContainer}>
        <div className={styles.configSection}>
          <div className={styles.configBox}>
            <label className={styles.configLabel}>Tema:</label>
              <select value={theme} onChange={handleThemeChange} className={styles.configSelect}>
                <option value="dark">Escuro</option>
                <option value="light">Claro</option>
                <option value="contrast">Daltônico (Alto Contraste)</option>
              </select>
          </div>

        </div>
      </div>
    </>
  );
}

export default Config;
