export default function StudentsTable({ students, handleOpenModal, styles, selectedNrc }) {
    return (
        <div className={styles.tableContainer}>
         
            <div className={styles.titleContainer}>
                <span className={styles.bold}>NRC: &nbsp;</span>
                <span>{selectedNrc?.label || '—'} &nbsp;</span>
                <span className={styles.bold}> PROFESOR: &nbsp;</span>
                <span>{selectedNrc?.profesor || '—'}</span>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Alumnos</th>
                        <th>Formulario</th>
                        <th>¿Está autorizado?</th>
                        <th>Fecha Defensa</th>
                        <th>Documentos</th>
                        <th>Eliminar</th>
                        <th>Ver más</th>
                    </tr>
                </thead>

                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.rut || Math.random().toString()}>
                                <td>{student.label || "—"}</td>
                                <td>{student.formulario ? "✔" : "❌"}</td>
                                <td>{student.autorizado ? "✔" : "❌"}</td>
                                <td>
                                    {student.fechaDefensa
                                        ? new Date(student.fechaDefensa).toLocaleString("es-ES", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })
                                        : "❌"}
                                </td>
                                <td>
                                    {student.documentos > 0
                                        ? `${student.documentos}/${student.totalDocumentos || 6}`
                                        : "❌"}
                                </td>
                                <td>
                                    <button className={styles.buttonFilters}>🗑️</button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleOpenModal({
                                            name: student.label || "Desconocido",
                                            formulario: student.formulario ? "Completado" : "No completado",
                                            autorizado : student.autorizado ? "Sí" : "No",
                                            rut: student.rut || "Sin RUT",
                                            email: student.email || "Sin correo",
                                            fechaDefensa: student.fechaDefensa
                                                ? new Date(student.fechaDefensa).toLocaleString("es-ES", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true
                                                })
                                                : "No asignada",
                                            documentos: student.documentos > 0
                                                ? `${student.documentos}/${student.totalDocumentos || 6}`
                                                : "0/6",
                                            nrc: student.nrc || "Sin NRC"
                                        }, false)}
                                        className={styles.buttonFilters}
                                    >
                                        🔍
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay datos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
