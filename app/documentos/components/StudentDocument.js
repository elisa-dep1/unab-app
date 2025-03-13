"use client";
import InputFile from "./InputFile";
import styles from "../document.module.css";
import axios from "axios";
import { useState } from "react";

export default function DocumentStudent() {
  const [docs, setDocs] = useState({});

  const saveDocuments = async () => {
    const formData = new FormData();

    Object.entries(docs).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });


    if (![...formData.keys()].length) {
      alert("No hay archivos para subir.");
      return;
    }

    try {
      const rutas = await axios.post("/api/upload-documents", formData);

      if (!rutas.data.paths || rutas.data.paths.length === 0) {
        alert("Error al subir los archivos.");
        return;
      }

      const paths = rutas.data.paths;

      const newDocs = {
        idInformeDoc: paths.idInformeDoc || null,
        idInformePdf: paths.idInformePdf || null,
        idPresentacionPpt: paths.idPresentacionPpt || null,
        idPresentacionPdf: paths.idPresentacionPdf || null,
        ria: paths.ria || null,
        idAutorizacionPdf: paths.idAutorizacionPdf || null,
      };
       console.log( newDocs)

      await axios.post("/api/documents/students", newDocs);
      alert("Archivos guardados correctamente.");

    } catch (error) {
      console.error("Error al guardar archivos:", error);
      alert("No se pudieron subir los archivos.");
    }
  };

  const handleForm = (key, value) => {
    setDocs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.containerGeneral}>
      <div className={styles.containerCards}>
        <InputFile
          title={"Informe de tesis formato WORD "}
          accept={".doc, .docx"}
          height={20}
          onChange={(e) => handleForm("idInformeDoc", e.target.files[0])}
        />

        <InputFile
          title={"Informe de tesis formato PDF "}
          accept={".pdf"}
          height={20}
          onChange={(e) => handleForm("idInformePdf", e.target.files[0])}
        />

        <InputFile
          title={"Presentación en formato PPT"}
          accept={".ppt, .pptx"}
          height={20}
          onChange={(e) => handleForm("idPresentacionPpt", e.target.files[0])}
        />

        <InputFile
          title={"Presentación en formato PDF"}
          accept={".pdf"}
          height={20}
          onChange={(e) => handleForm("idPresentacionPdf", e.target.files[0])}
        />

        <InputFile
          title={"RIA en formato PDF"}
          accept={".pdf"}
          height={20}
          onChange={(e) => handleForm("ria", e.target.files[0])}
        />

        <InputFile
          title={"Autorización en formato PDF"}
          accept={".pdf"}
          height={20}
          onChange={(e) => handleForm("idAutorizacionPdf", e.target.files[0])}
        />
      </div>
      <div>
        <button onClick={saveDocuments} className="globalButton">
          Guardar
        </button>
      </div>
    </div>
  );
}
