"use client";
import InputFile from "./InputFile";
import styles from "../document.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DocumentStudent() {
  const [docs, setDocs] = useState({});

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await axios.get("/api/documents/students");
        const data = res.data.files;

        if (data.length > 0) {
          const newDocs = {
            idInformeDoc: data[0].idInformeDoc ? data[0].idInformeDoc.split("\\").pop() : null,
            idInformePdf: data[0].idInformePdf ? data[0].idInformePdf.split("\\").pop() : null,
            idPresentacionPpt: data[0].idPresentacionPpt ? data[0].idPresentacionPpt.split("\\").pop() : null,
            idPresentacionPdf: data[0].idPresentacionPdf ? data[0].idPresentacionPdf.split("\\").pop() : null,
            ria: data[0].ria ? data[0].ria.split("\\").pop() : null,
            idAutorizacionPdf: data[0].idAutorizacionPdf ? data[0].idAutorizacionPdf.split("\\").pop() : null,
          };

          setDocs(newDocs);
        }
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    }

    fetchFiles();
  }, []);

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
      const rutas = await axios.post("/api/documents/students/upload-docs-students", formData);

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
      await axios.post("/api/documents/students", newDocs);
      alert("Archivos guardados correctamente.");
      window.location.reload();
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
          value={docs.idInformeDoc || ""}
          fileField="idInformeDoc"
          onChange={(e) => handleForm("idInformeDoc", e.target.files[0])}
        />

        <InputFile
          title={"Informe de tesis formato PDF "}
          accept={".pdf"}
          height={20}
          value={docs.idInformePdf || ""}
          fileField="idInformePdf"
          onChange={(e) => handleForm("idInformePdf", e.target.files[0])}
        />

        <InputFile
          title={"Presentación en formato PPT"}
          accept={".ppt, .pptx"}
          height={20}
          value={docs.idPresentacionPpt || ""}
          fileField="idPresentacionPpt"
          onChange={(e) => handleForm("idPresentacionPpt", e.target.files[0])}
        />

        <InputFile
          title={"Presentación en formato PDF"}
          accept={".pdf"}
          height={20}
          value={docs.idPresentacionPdf || ""}
          fileField="idPresentacionPdf"
          onChange={(e) => handleForm("idPresentacionPdf", e.target.files[0])}
        />

        <InputFile
          title={"RIA en formato PDF"}
          accept={".pdf"}
          height={20}
          value={docs.ria || ""}
          fileField="ria"
          onChange={(e) => handleForm("ria", e.target.files[0])}
        />

        <InputFile
          title={"Autorización en formato PDF"}
          accept={".pdf"}
          height={20}
          value={docs.idAutorizacionPdf || ""}
          fileField="idAutorizacionPdf"
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
