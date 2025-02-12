"use client";
import { useState } from "react";
import styles from "./filter.module.css";
import Select from "react-select";
import filtersData from "../../src/data/filters.json";

export default function Filters() {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#ffffff",
      borderColor: state.isFocused ? "#962330" : "#021f54", // Borde rojo al enfocar, azul por defecto
      boxShadow: "none", // Elimina la sombra azul predeterminada
      "&:hover": {
        borderColor: "#962330", // Borde rojo al pasar el mouse
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#962330"
        : state.isFocused
          ? "#f4d3d6"
          : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#000000",
      "&:hover": {
        backgroundColor: "#f4d3d6",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#962330",
      fontWeight: "bold",
    }),
  };

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedNrc, setSelectedNrc] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredPeriods = (filtersData.period || [])
    .filter((p) => p.model === selectedModel?.value)
    .map((p) => ({
      value: `${selectedYear?.value}${p.value}`,
      label: `${selectedYear?.value}${p.value}`,
    }));

  //TODO: Cambiar después filtersData.student por la data de la BD
  const filteredStudents = (filtersData.student || []).filter(
    (s) => s.nrc === selectedNrc?.value
  );

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedModel(null);
    setSelectedPeriod(null);
    setSelectedNrc(null);
    setSelectedStudent(null);
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedPeriod(null);
    setSelectedNrc(null);
    setSelectedStudent(null);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setSelectedNrc(null);
    setSelectedStudent(null);
  };

  const handleNrcChange = (nrc) => {
    setSelectedNrc(nrc);
    setSelectedStudent(null);
  };

  const handleStudentChange = (student) => {
    setSelectedStudent(student);
  };

  const handleUrl = () => {
    window.location.href = "/informacion-estudiante";
  };


  const dataLoaded = selectedNrc && filteredStudents.length > 0;

  return (
    <div className={styles.containerGeneral}>
      <div className={styles.containerFiltros}>
        <Select
          className={styles.filter}
          styles={customStyles}
          instanceId="year-select"
          isClearable
          options={filtersData.years}
          onChange={handleYearChange}
          placeholder="Selecciona el año..."
        />

        <Select
          className={styles.filter}
          styles={customStyles}
          instanceId="model-select"
          isClearable
          options={filtersData.model}
          value={selectedModel}
          onChange={handleModelChange}
          placeholder="Selecciona la modalidad..."
          isDisabled={!selectedYear}
        />

        <Select
          className={styles.filter}
          styles={customStyles}
          instanceId="period-select"
          isClearable
          options={filteredPeriods}
          value={selectedPeriod}
          onChange={handlePeriodChange}
          placeholder="Selecciona el periodo..."
          isDisabled={!selectedModel}
        />

        <Select
          className={styles.filter}
          styles={customStyles}
          instanceId="nrc-select"
          isClearable
          options={filtersData.nrc}
          value={selectedNrc}
          onChange={handleNrcChange}
          placeholder="Selecciona el NRC..."
          isDisabled={!selectedPeriod}
        />
      </div>


      <div className={styles.tableContainer}>
        <div className={styles.titleContainer}>
          <span className={styles.bold}>NRC: &nbsp;</span>
          <span>{selectedNrc ? selectedNrc.label : '—'} &nbsp;</span>
          <span className={styles.bold}> PROFESOR: &nbsp;</span>
          <span>{selectedNrc ? selectedNrc.profesor : '—'}</span>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Alumnos</th>
              <th>Formulario</th>
              <th>Fecha Defensa</th>
              <th>Documentos</th>
              <th>Eliminar</th>
              <th>Ver más</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.value}>
                  <td>{student.label}</td>
                  <td>{student.formulario ? "✔" : "❌"}</td>
                  <td>
                    {student.fechaDefensa
                      ? new Date(student.fechaDefensa).toLocaleString("en-US", {
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
                      ? `${student.documentos}/${student.totalDocumentos}`
                      : "❌"}
                  </td>
                  <td>
                    <button className={styles.buttonFilters}>🗑️</button>
                  </td>
                  <td>
                    <button className={styles.buttonFilters}>🔍</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" >
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div className={styles.containerIconAdd}>
        <span
          onClick={dataLoaded ? handleUrl : null}
          className={`${styles.iconAdd} ${!dataLoaded ? styles.disabled : styles.enabled}`}
        >
          +
        </span>
      </div>

    </div>
  );
}
