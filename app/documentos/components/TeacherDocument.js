"use client"

import InputFile from "./InputFile";
import styles from "../document.module.css"
import filtersData from "../../../src/data/filters.json";
import { useEffect, useState } from "react";
import axios from "axios";
import FiltersSelect from "@/app/alumnos/components/FiltersSelect";

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
      setSelectedPeriod(null);
      setNrcOptions([]);
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


  return (
    <div className={styles.containerGeneralT}>
      <div className={styles.containerFilters}>
        <FiltersSelect
          options={filtersData.years}
          value={year}
          onChange={setYear}
          placeholder="Selecciona año"
          instanceId="year"
        />
        <FiltersSelect
          options={filtersData.model}
          value={type}
          onChange={setType}
          placeholder="Selecciona tipo"
          instanceId="type"
        />
        <FiltersSelect
          options={periodOptions}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          placeholder="Selecciona periodo"
          instanceId="period"
          isDisabled={!periodOptions.length}
        />
        <FiltersSelect
          options={nrcOptions.map(nrc => ({ value: nrc.codigo, label: nrc.codigo }))}
          value={selectedNrc}
          onChange={setSelectedNrc}
          placeholder="Selecciona NRC"
          instanceId="nrc"
          isDisabled={!nrcOptions.length}
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
          isDisabled={!studentOptions.length}
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
