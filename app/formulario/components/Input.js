import { useState } from "react";
import styles from "../form.module.css"

export default function Input({ label, value, onChange , placeholder}) {
 
    return (
        <section className={styles.containerSection}>
            <div className={styles.title}>{label}</div>
            <textarea
                className={`${styles.value} ${(value || 0).length > 90 ? styles.valid : styles.invalid}`}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </section>
    )
}