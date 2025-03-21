"use client"

import InputFile from "./InputFile";
import styles from "../document.module.css"
import filtersData from "../../../src/data/filters.json";
import { useEffect, useState } from "react";
import axios from "axios";
import FiltersSelect from "@/app/components/FiltersSelect";

export default function DocumentTeacher() {
  const [year, setYear] = useState(null);
  const [type, setType] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [periodOptions, setPeriodOptions] = useState([]);
  const [selectedNrc, setSelectedNrc] = useState(null);
  const [nrcOptions, setNrcOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentOptions, setStudentOptions] = useState([]);

  const formatName = (nombre) => {
    if (!nombre) return "";
    const parts = nombre.split(" ");
    return parts.length > 2
      ? `${parts.slice(2).join(" ")} ${parts[0]} ${parts[1]}`
      : parts.join(" ");
  };

  useEffect(() => {
    if (year && type) {
      setPeriodOptions(
        filtersData.period
          .filter(p => p.model === type.value)
          .map(p => ({
            value: `${year.value}${p.value}`,
            label: `${year.value}${p.value}`,
          }))
      );
    }
  }, [year, type]);

  const fetchData = async (url, params, setter) => {
    try {
      const res = await axios.get(url, { params });
      setter(res.data);
    } catch (err) {
      console.error(err);
      alert("No se encontró nada");
    }
  };

  useEffect(() => {
    if (selectedPeriod) fetchData("/api/nrc", { periodo: selectedPeriod.value }, setNrcOptions);
    if (selectedNrc) fetchData("api/nrc/alumnos", { nrc: selectedNrc.value }, setStudentOptions);
  }, [selectedPeriod, selectedNrc]);

  const handleYearChange = (selected) => {
    setYear(selected);
    setType(null);
    setSelectedPeriod(null);
    setSelectedNrc(null);
    setSelectedStudent(null);
    setPeriodOptions([]);
    setNrcOptions([]);
    setStudentOptions([]);
  };

  const handleTypeChange = (selected) => {
    setType(selected);
    setSelectedPeriod(null);
    setSelectedNrc(null);
    setSelectedStudent(null);
    setNrcOptions([]);
    setStudentOptions([]);
  };

  const handlePeriodChange = (selected) => {
    setSelectedPeriod(selected);
    setSelectedNrc(null);
    setSelectedStudent(null);
    setStudentOptions([]);
  };

  const handleNrcChange = (selected) => {
    setSelectedNrc(selected);
    setSelectedStudent(null);
  };

  return (
    <div className={styles.containerGeneralT}>
      <div className={styles.containerFilters}>
        <FiltersSelect
          options={filtersData.years}
          value={year}
          onChange={handleYearChange}
          placeholder="Selecciona año"
          instanceId="year"
          width="250px"
        />
        <FiltersSelect
          options={filtersData.model}
          value={type}
          onChange={handleTypeChange}
          placeholder="Selecciona tipo"
          instanceId="type"
          isDisabled={!year}
          width="250px"
        />
        <FiltersSelect
          options={periodOptions}
          value={selectedPeriod}
          onChange={handlePeriodChange}
          placeholder="Selecciona periodo"
          instanceId="period"
          isDisabled={!type}
          width="250px"
        />
        <FiltersSelect
          options={nrcOptions.map(nrc => ({ value: nrc.codigo, label: nrc.codigo }))}
          value={selectedNrc}
          onChange={handleNrcChange}
          placeholder="Selecciona NRC"
          instanceId="nrc"
          isDisabled={!selectedPeriod}
          width="250px"
        />
        <FiltersSelect
          options={studentOptions.map(student =>
          ({
            value: student.nombre,
            label: formatName(student.nombre)
          }))}
          value={selectedStudent}
          onChange={setSelectedStudent}
          placeholder="Selecciona alumno"
          instanceId="alumno"
          isDisabled={!selectedNrc}
          width="250px"
        />
      </div>
      <div className={styles.containerCards}>
        <InputFile title={"Acta de notas "} accept={".doc, .docx"} height={20} />
        <InputFile title={"Acta de apertura y cierre "} accept={".pdf"} height={20} />
        <InputFile title={"Rubrica"} accept={".ppt, .pptx"} height={20} />
      </div>
    </div>
  );
}
