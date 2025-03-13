"use client";
import { useEffect, useState } from "react";
import StudentsTable from "./components/StudentsTable";
import styles from "./filter.module.css";
import FiltersSelect from "./components/FiltersSelect";
import filtersData from "../../src/data/filters.json";
import axios from "axios";
import Modal from "./components/Modal";

export default function Filters() {
  const [year, setYear] = useState(null);
  const [type, setType] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [periodOptions, setPeriodOptions] = useState([]);
  const [selectedNrc, setSelectedNrc] = useState(null);
  const [nrcOptions, setNrcOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);


  const [modalData, setModalData] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = (data = null, isAdding = false) => {
    setModalData(data);
    setIsAddingStudent(isAdding);
    setIsModalOpen(true);
  };


  return (
    <>
      <div className={styles.containerGeneral}>
        <div className={styles.containerFiltros}>
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

        </div>

        <StudentsTable
          students={studentOptions.map(student =>
          ({
            value: student.nombre,
            label: formatName(student.nombre)
          }))}
          handleOpenModal={(student) => handleOpenModal(student, false)}
          styles={styles}
          selectedNrc={selectedNrc}
        />



        <div className={styles.containerIconAdd}>
          <span
            onClick={() => handleOpenModal(null, true)}
            className={`${styles.iconAdd} ${studentOptions.length === 0 ?
              styles.disabled : styles.enabled}`}
          >+</span>
        </div>


        {isModalOpen && (
          <Modal
            data={modalData}
            isAddingStudent={isAddingStudent}
            onClose={() => setIsModalOpen(false)}
          />
        )}

      </div>
    </>
  );
}
