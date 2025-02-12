"use client"
import styles from "../inicio.module.css";

export default function Card({ title, description, text, image, url }) {
    const handleUrl = () =>{
        window.location.href = url;
    }
    return (
        <>
            <div onClick={handleUrl}  className={styles.containerCard}>
                <div className={styles.containerText}>
                    <span className={styles.titleCard}>{title}</span>
                    <span className={styles.descriptionCard}>{description}</span>
                    <div className={styles.buttonCard}>
                        {text}
                    </div>
                </div>

                <div className={styles.containerImage}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#021F54"
                            d="M46.2,-53.5C58.4,-54.7,65.9,-39.3,67.6,-24.3C69.4,-9.3,65.3,5.3,56.2,13.7C47.2,22,33.1,24.1,22.9,35C12.7,45.9,6.4,65.6,-4.3,71.5C-14.9,77.4,-29.9,69.5,-45.5,60.4C-61.1,51.2,-77.4,40.8,-78.9,27.7C-80.4,14.5,-67,-1.5,-53.2,-9.1C-39.5,-16.8,-25.4,-16.2,-16.5,-16.1C-7.6,-16,-3.8,-16.3,6.6,-25.4C17,-34.5,33.9,-52.3,46.2,-53.5Z"
                            transform="translate(100 100)"
                        />
                    </svg>

                    <img src={image} alt="Logo" className={styles.icon} />


                </div>
            </div>

        </>

    )

}