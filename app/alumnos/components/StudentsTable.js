import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export default function StudentsTable({ students, handleOpenModal, styles, selectedNrc, userType }) {
    const formatName = (nombre) => {
        if (!nombre) return "";
        const parts = nombre.split(" ");
        return parts.length > 2
            ? `${parts.slice(2).join(" ")} ${parts[0]} ${parts[1]}`
            : parts.join(" ");
    };


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
                        {userType !== "profesor" && <th>Desactivar</th>}
                        <th>Ver más</th>
                    </tr>
                </thead>

                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => {
                            const doc = student.documentosEstudiante || {};

                            const totalCargados = [
                                doc.idInformeDoc,
                                doc.idInformePdf,
                                doc.idPresentacionPpt,
                                doc.idPresentacionPdf,
                                doc.ria,
                                doc.idAutorizacionPdf
                            ].filter(item => item !== null && item !== undefined).length;


                            return (
                                <tr key={student.rut || Math.random().toString()}>
                                    <td>{formatName(student.nombre) || "—"}</td>
                                    <td>{student.formulariosComoEstudiante?.[0] ? "✔" : "❌"}</td>
                                    <td>{student.defensasComoEstudiante?.[0] ? "✔" : "❌"}</td>
                                    <td>
                                        {student.defensasComoEstudiante[0]?.fecha
                                            ? format(new Date(student.defensasComoEstudiante[0].fecha), "dd-MM-yyyy, h:mm a", { locale: es })
                                            : "❌"}
                                    </td>
                                    <td>
                                        {totalCargados > 0 ? `${totalCargados}/6` : "0/6"}
                                    </td>

                                    {userType !== "profesor" && (
                                        <td>
                                            <button className={styles.buttonFilters}>⊘</button>
                                        </td>
                                    )}


                                    <td>
                                        <button
                                            onClick={() => {
                                                const defensa = student.defensasComoEstudiante?.[0];
                                                handleOpenModal({
                                                    name: formatName(student.nombre) || "Desconocido",
                                                    formulario: student.formulariosComoEstudiante?.[0] ? "Completo" : "Incompleto",
                                                    autorizado: defensa?.autorizacion === true ? "Autorizado" : "No autorizado",
                                                    rut: student.rut || "Sin RUT",
                                                    email: student.correo || "Sin correo",
                                                    fechaDefensa: defensa?.fecha
                                                        ? format(new Date(defensa.fecha), "dd-MM-yyyy, h:mm a", { locale: es })
                                                        : "No asignada",
                                                    documentos: `${totalCargados}/6`,
                                                    nrc: selectedNrc.label || "Sin NRC",
                                                    
                                                    tituloProyecto: student.formulariosComoEstudiante?.[0]?.tituloProyecto || "-",
                                                    resumenEjecutivo: student.formulariosComoEstudiante?.[0]?.resumenEjecutivo || "-",
                                                    justificacion:student.formulariosComoEstudiante?.[0]?.justificacionProyecto || "-",
                                                    objetivoGeneral: student.formulariosComoEstudiante?.[0]?.objetivoGeneral || "-",
                                                    objetivosEspecificos: student.formulariosComoEstudiante?.[0]?.objetivosEspecificos || "-",
                                                    alcanceProyecto:student.formulariosComoEstudiante?.[0]?.alcanceProyecto || "-",
                                                    herramientas: student.formulariosComoEstudiante?.[0]?.elementosHerramientas || "-",
                                                    resultados: student.formulariosComoEstudiante?.[0]?.prodResultadosEsperados|| "-",
                                                    palabrasClave: student.formulariosComoEstudiante?.[0]?.palabrasClave || "-",
                                                }, false);
                                            }}
                                            className={styles.buttonFilters}
                                        >
                                            🔍
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
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
