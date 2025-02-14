import styles from "../form.module.css"

export default function Section({ label, value }) {

    return (
        <section className={styles.containerSection}>
            <div className={styles.title}>{label}</div>
            <div className={styles.value}>{value}</div>
        </section>
    )
}