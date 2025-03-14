"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../document.module.css";
import axios from "axios";

export default function InputFile({ value, title, accept, height, onChange, fileField }) {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [color, setColor] = useState(styles.container);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile.name);
      setColor(styles.container + " " + styles.activeColor);

      if (onChange) {
        onChange(event);
      }
    }
  };



  const removeFile = async () => {
    if (!fileName) return;

    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este archivo?");
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/documents/students", {
        data: { fileField },
      });

      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setColor(styles.container);

      if (onChange) {
        onChange({ target: { files: [] } });
      }
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
      alert("Hubo un error al eliminar el archivo.");
    }
  };



  useEffect(() => {
    if (value) {
      setFileName(value);
      setColor(
        styles.container +
        (typeof value === "string" ? " " + styles.activeColor : fileName ? " " + styles.pendingFile : "")
      );

    }
  }, [value]);

  return (
    <div className={color}>
      <label className={styles.label}>{title}</label>

      <input
        ref={fileInputRef}
        className={styles.inputFile}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={value && typeof value === "string"}



      />

      <div className={styles.customInput} onClick={() => fileInputRef.current?.click()}>
        <img src="/images/file.png" height={height} />
        <span>Selecciona un archivo desde tu dispositivo</span>
      </div>

      <div className={styles.containerFileName}>
        <img src="/images/clip.png" width={20} style={{ marginRight: "2px" }} />
        <input className={styles.titleFile}
          type="text"
          value={typeof value === "object" && value instanceof File ? value.name : value || fileName}
          placeholder="Ningún archivo seleccionado"
          readOnly />

        {typeof value === "string" && value && (

          <button className={styles.removeFile} onClick={removeFile}>
            <img src="/images/trash.svg" width={20} />
          </button>
        )}

      </div>
    </div>
  );
}
