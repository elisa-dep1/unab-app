"use client"
import { useState } from "react";
import styles from "../inicio.module.css";
import Select from 'react-select';
import filtersData from "../../../src/data/filters.json";


export default function AdminMainComponent() {

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedNrc, setSelectedNrc] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredPeriods = (filtersData.period || []).filter(p =>
    p.model === selectedModel?.value
  ).map(p => ({
    value: `${selectedYear?.value}${p.value}`,
    label: `${selectedYear?.value}${p.value}`
  }));

  //TODO: Cambiar después filtersData.student por la data de la BD
  const filteredStudents = (filtersData.student || []).filter(s =>
    s.nrc === selectedNrc?.value
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

  return (
    <div className={styles.containerGeneral}>
      <div className={styles.containerFiltros}>
        <Select
          className={styles.filter}
          instanceId="year-select"
          isClearable
          options={filtersData.years}
          onChange={handleYearChange}
          placeholder="Selecciona el año..."
        />

        <Select
          className={styles.filter}
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
          instanceId="nrc-select"
          isClearable
          //TODO: Cambiar después filtersData.nrc por la data de la BD
          options={filtersData.nrc}
          value={selectedNrc}
          onChange={handleNrcChange}
          placeholder="Selecciona el NRC..."
          isDisabled={!selectedPeriod}
        />
      </div>
      {selectedNrc && (
        <div className={styles.tableContainer}>
          <span>NRC: {selectedNrc.label} - PROFESOR: {selectedNrc.profesor}</span>
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
              {filteredStudents.map((student) => (
                <tr key={student.value}>
                  <td>{student.label}</td>
                  <td>{student.formulario ? '✔' : '✘'}</td>
                  <td>{student.fechaDefensa ? new Date(student.fechaDefensa).toLocaleString() : '✘'}</td>
                  <td>{student.documentos > 0 ? `${student.documentos}/${student.totalDocumentos}` : '✘'}</td>
                  <td><button>🗑️</button></td>
                  <td><button>🔍</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}