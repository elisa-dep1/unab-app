"use client";
import { useRef, useState } from "react";
import styles from "./newnrc.module.css";


export default function NuevoNrc() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [color, setColor] = useState(styles.container);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setColor(styles.container + " " + styles.activeColor);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setColor(styles.container);
  };

  return (
    <div className={styles.containerGeneral}>
      <div className={color}>
        <label className={styles.label}>AÑADE NUEVOS NRC</label>

        <input
          ref={fileInputRef}
          className={styles.inputFile}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />

        <div className={styles.customInput} onClick={() => fileInputRef.current?.click()}>
          <img src="/images/file.png" height={100} />
          <span>Selecciona un archivo desde tu dispositivo</span>
        </div>

        <div className={styles.containerFileName}>
          <img src="/images/clip.png" width={20} style={{ marginRight: "2px" }} />
          <input
            className={styles.titleFile}
            type="text"
            value={file ? file.name : "Ningún archivo seleccionado"}
            readOnly
          />
          <button className={styles.removeFile} onClick={removeFile}>
            <img src="/images/trash.svg" width={20} />
          </button>
        </div>
      </div>

      <div>
        <button className={styles.buttonSave}>Guardar</button>
      </div>
    </div>
  );
}
