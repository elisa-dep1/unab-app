"use client";
import { useState, useRef, useMemo } from "react";
import styles from "../document.module.css";

export default function InputFile({ title, accept, height }) {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [color, setColor] = useState(styles.container);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile ? selectedFile.name : "");

    setColor(styles.container + " " + styles.activeColor)

  };

  const removeFile = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setColor(styles.container)
  };



  return (
    <div className={color}>

      <label className={styles.label}>{title}</label>

      <input
        ref={fileInputRef}
        className={styles.inputFile}
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />

      <div className={styles.customInput} onClick={() => fileInputRef.current?.click()}>
        <img src="/images/file.png" height={height} />
        <span>Selecciona un archivo desde tu dispositivo</span>
      </div>

      <div className={styles.containerFileName}>
        <img src="/images/clip.png" width={20} style={{ marginRight: "2px" }} />
        <input className={styles.titleFile} type="text" value={fileName} placeholder="Ningún archivo seleccionado" readOnly />
        <button className={styles.removeFile} onClick={removeFile}>
          <img src="/images/trash.svg" width={20} />
        </button>
      </div>
    </div>
  );
}
