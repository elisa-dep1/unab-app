"use client";
import { useState, useEffect } from "react";
import style from "../pres.module.css";
import FiltersSelect from "@/app/components/FiltersSelect";
import filtersData from "../../../src/data/filters.json";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { format } from "date-fns";


export default function DateDefenseTeacher() {
    const [authorized, setAuthorized] = useState({});
    const [year, setYear] = useState(null);
    const [type, setType] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [periodOptions, setPeriodOptions] = useState([]);
    const [selectedNrc, setSelectedNrc] = useState(null);
    const [nrcOptions, setNrcOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [defensasCreadas, setDefensasCreadas] = useState([]);
    const [ediciones, setEdiciones] = useState({});

    const formatName = (nombre) => {
        if (!nombre) return "";
        const parts = nombre.split(" ");
        return parts.length > 2
            ? `${parts.slice(2).join(" ")} ${parts[0]} ${parts[1]}`
            : parts.join(" ");
    };

    const fetchData = async (url, params, setter) => {
        try {
            const res = await axios.get(url, { params });
    
            if (url.includes("alumnos")) {
                setter(res.data.estudiantes || []);
            } else {
                setter(res.data);
            }
        } catch (err) {
            console.error(err);
            alert("No se encontró nada");
        }
    };
    

    const loadDefensas = async () => {
        try {
            const res = await axios.get("/api/defensa", {
                params: {
                    codigoNRC: selectedNrc?.value,
                    periodo: selectedPeriod?.value,
                },
            });

            const data = res.data;
            setDefensasCreadas(data);

            const autorizadosIniciales = {};
            data.forEach((def) => {
                if (def.autorizacion) autorizadosIniciales[def.idEstudiante] = true;
            });
            setAuthorized(autorizadosIniciales);
        } catch (err) {
            console.error("Error al cargar defensas:", err);
        }
    };

    useEffect(() => {
        if (year && type) {
            setPeriodOptions(
                filtersData.period
                    .filter((p) => p.model === type.value)
                    .map((p) => ({
                        value: `${year.value}${p.value}`,
                        label: `${year.value}${p.value}`,
                    }))
            );
        }
    }, [year, type]);

    useEffect(() => {
        if (selectedPeriod) {
            fetchData("/api/nrc", { periodo: selectedPeriod.value }, setNrcOptions);
        }
    }, [selectedPeriod]);

    useEffect(() => {
        if (selectedNrc) {
            fetchData("/api/nrc/alumnos", { nrc: selectedNrc.value }, setStudentOptions);
        }
        if (selectedNrc && selectedPeriod) {
            loadDefensas();
        }
    }, [selectedNrc, selectedPeriod]);

    const handleYearChange = (selected) => {
        setYear(selected);
        setType(null);
        setSelectedPeriod(null);
        setSelectedNrc(null);
        setPeriodOptions([]);
        setNrcOptions([]);
        setStudentOptions([]);
        setDefensasCreadas([]);
    };

    const handleTypeChange = (selected) => {
        setType(selected);
        setSelectedPeriod(null);
        setSelectedNrc(null);
        setNrcOptions([]);
        setStudentOptions([]);
        setDefensasCreadas([]);
    };

    const handlePeriodChange = (selected) => {
        setSelectedPeriod(selected);
        setSelectedNrc(null);
        setStudentOptions([]);
        setDefensasCreadas([]);
    };

    const toggleAuthorization = (id) => {
        setAuthorized((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSaveAuthorization = async () => {
        for (const student of studentOptions) {
            const estaAutorizado = authorized[student.rut] === true;

            try {
                if (estaAutorizado) {
                    await axios.post("/api/defensa", {
                        idEstudiante: student.rut,
                        codigoNRC: selectedNrc.value,
                        periodo: selectedPeriod.value,
                    });
                } else {
                    await axios.delete("/api/defensa", {
                        data: {
                            idEstudiante: student.rut,
                            codigoNRC: selectedNrc.value,
                            periodo: selectedPeriod.value,
                        },
                    });
                }
            } catch (err) {
                console.error("Error al guardar/cambiar:", err);
                alert("Ocurrió un error al guardar cambios.");
            }
        }

        alert("Cambios guardados.");
        await loadDefensas();
    };

    const handleChange = (id, field, value) => {
        setEdiciones((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };
    const handleSaveDefensas = async () => {
        const updates = Object.entries(ediciones);

        for (const [id, data] of updates) {
            try {
                const payload = { id };

                if (data.fecha !== undefined) {
                    payload.fecha = data.fecha instanceof Date
                        ? data.fecha.toISOString()
                        : data.fecha;
                }

                if (data.sala !== undefined && data.sala.trim() !== "") {
                    payload.sala = data.sala;
                }

                await axios.put("/api/defensa", payload);
            } catch (err) {
                console.error("Error al actualizar defensa:", err);
                alert("Error al guardar cambios.");
            }
        }

        alert("Cambios guardados.");
        await loadDefensas();
        setEdiciones({});
    };



    return (
        <div className={style.containerGeneral}>
            <div className={style.filtersContainer}>
                <FiltersSelect options={filtersData.years} value={year} onChange={handleYearChange} placeholder="Selecciona año" instanceId="year" width="250px" />
                <FiltersSelect options={filtersData.model} value={type} onChange={handleTypeChange} placeholder="Selecciona tipo" instanceId="type" isDisabled={!year} width="250px" />
                <FiltersSelect options={periodOptions} value={selectedPeriod} onChange={handlePeriodChange} placeholder="Selecciona periodo" instanceId="period" isDisabled={!type} width="250px" />
                <FiltersSelect options={nrcOptions.map((nrc) => ({ value: nrc.codigo, label: nrc.codigo }))} value={selectedNrc} onChange={setSelectedNrc} placeholder="Selecciona NRC" instanceId="nrc" isDisabled={!selectedPeriod} width="250px" />
            </div>

            <div className={style.tablesContainer}>
                <div className={style.authorizationTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre alumno</th>
                                <th>Autorización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentOptions.length > 0 ? (
                                studentOptions.map((student) => (
                                    <tr key={student.rut || Math.random().toString()}>
                                        <td>{formatName(student.nombre)}</td>
                                        <td style={{ cursor: "pointer" }} onClick={() => toggleAuthorization(student.rut)}>
                                            {authorized[student.rut] ? "✔" : "❌"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No hay alumnos</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button className={style.saveButton} onClick={handleSaveAuthorization}>Guardar</button>
                </div>

                <div className={style.defenseDate}>
                    <table className={style}>
                        <thead>
                            <tr>
                                <th>Nombre alumno</th>
                                <th>Fecha</th>
                                <th>Sala</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {defensasCreadas.length > 0 ? (
                                defensasCreadas.map((def) => {
                                    const edicion = ediciones[def.id] || {};
                                    const tieneDatos = def.fecha || def.sala;
                                    const estaEditando = edicion.editando === true;

                                    return (
                                        <tr key={def.id}>
                                            <td>{formatName(def.estudiante?.nombre)}</td>


                                            <td>
                                                {estaEditando ? (

                                                    <DatePicker
                                                        selected={
                                                            edicion.fecha
                                                                ? new Date(edicion.fecha)
                                                                : def.fecha
                                                                    ? new Date(def.fecha)
                                                                    : null
                                                        }
                                                        onChange={(date) => handleChange(def.id, "fecha", date)} 
                                                        locale={es}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="dd-MM-yyyy ' - '  h:mm a"
                                                        placeholderText="Selecciona fecha y hora"
                                                    />

                                                ) : def.fecha ? (
                                                    format(new Date(def.fecha), "dd-MM-yyyy ' - '  h:mm a", {
                                                        locale: es
                                                    })

                                                ) : (

                                                    <span
                                                        onClick={() =>
                                                            handleChange(def.id, "editando", true)
                                                        }
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        📆
                                                    </span>
                                                )}
                                            </td>

                                            {/* Sala */}
                                            <td>
                                                {estaEditando || !def.sala ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Ej: Sala 201"
                                                        value={edicion.sala ?? def.sala ?? ""}
                                                        onChange={(e) => handleChange(def.id, "sala", e.target.value)}
                                                    />
                                                ) : (
                                                    def.sala
                                                )}
                                            </td>

                                            {/* Editar */}
                                            <td>
                                                <span
                                                    onClick={() => {
                                                        if (tieneDatos) {
                                                            handleChange(def.id, "editando", true);
                                                        }
                                                    }}
                                                    style={{
                                                        cursor: tieneDatos ? "pointer" : "not-allowed",
                                                        opacity: tieneDatos ? 1 : 0.3,
                                                    }}
                                                >
                                                    ✏️
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4">-</td>
                                </tr>
                            )}
                        </tbody>


                    </table>
                    <button className={style.saveButton} onClick={handleSaveDefensas}>Guardar</button>
                </div>
            </div>
        </div>
    );
}