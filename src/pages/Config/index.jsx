import { useEffect, useState } from "react";
import styles from "./Config.module.css";

function Config() {
  const [theme, setTheme] = useState("dark"); // tema padrão

  // Carrega o tema salvo no carregamento da página
  useEffect(() => {
    document.title = "VibeSync | Configurações";
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
            <label for="themeSelect" className={styles.configLabel}>Tema:</label>
              <select id="themeSelect" value={theme} onChange={handleThemeChange} className={styles.configSelect}>
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
