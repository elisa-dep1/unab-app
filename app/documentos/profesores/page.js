import InputFile from "../components/InputFile";
import styles from "../document.module.css"

export default function DocumentPageStudent() {

    return (
      <div className={styles.containerGeneral}>
  
        <InputFile title={"Acta de notas "} accept={".doc, .docx"} height={20}  />
  
        <InputFile title={"Acta de apertura y cierre "} accept={".pdf"} height={20} />
  
        <InputFile title={"Rubrica"} accept={".ppt, .pptx"} height={20} />
    
      </div>
  
    );
  }
  