import InputFile from "../components/InputFile";
import styles from "../document.module.css"


export default function DocumentPageStudent() {

  return (
    <div className={styles.containerGeneral}>

      <InputFile title={"Informe de tesis formato WORD "} accept={".doc, .docx"} height={20}/>

      <InputFile title={"Informe de tesis formato PDF "} accept={".pdf"} height={20} />

      <InputFile title={"Presentación en formato PPT"} accept={".ppt, .pptx"} height={20}  />

      <InputFile title={"Presentación en formato PDF"} accept={".pdf"} height={20} />

      <InputFile title={"RIA en formato PDF"} accept={".pdf"} height={20} />

      <InputFile title={"Autorización en formato PDF"} accept={".pdf"} height={20} />



    </div>

  );
}
