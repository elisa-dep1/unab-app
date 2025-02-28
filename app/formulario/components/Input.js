import styles from "../form.module.css"

export default function Input({ label, value, onChange }) {

    return (
        <section className={styles.containerSection}>
            <div className={styles.title}>{label}</div>
            <textarea
                className={styles.value}
                type="text"
                placeholder={value}
                onChange={onChange}

            />
        </section>
    )
}