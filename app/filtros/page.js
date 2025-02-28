"use client";
import { useState } from "react";
import styles from "./filter.module.css";
import filtersData from "../../src/data/filters.json";
import FiltersSelect from "./components/FiltersSelect";
import StudentsTable from "./components/StudentsTable";
import Modal from "./components/Modal";

export default function Filters() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedNrc, setSelectedNrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);


  const handleChange = (setter, resetters = []) => (value) => {
    setter(value);
    resetters.forEach((reset) => reset(null));
  };

  const handleOpenModal = (data = null, isAdding = false) => {
    setModalData(data);
    setIsAddingStudent(isAdding);
    setIsModalOpen(true);
  };


  const filteredPeriods = (filtersData.period || [])
    .filter((p) => p.model === selectedModel?.value)
    .map((p) => ({
      value: `${selectedYear?.value}${p.value}`,
      label: `${selectedYear?.value}${p.value}`,
    }));

  const filteredStudents = (filtersData.student || []).filter(
    (s) => s.nrc === selectedNrc?.value
  );

  return (
    <div className={styles.containerGeneral}>
      <div className={styles.containerFiltros}>
        <FiltersSelect
          options={filtersData.years}
          onChange={handleChange(setSelectedYear, [setSelectedModel, setSelectedPeriod, setSelectedNrc])}
          placeholder="Selecciona el año..."
          instanceId="year-select"
        />

        <FiltersSelect
          options={filtersData.model}
          value={selectedModel}
          onChange={handleChange(setSelectedModel, [setSelectedPeriod, setSelectedNrc])}
          placeholder="Selecciona la modalidad..."
          isDisabled={!selectedYear}
          instanceId="model-select"
        />

        <FiltersSelect
          options={filteredPeriods}
          value={selectedPeriod}
          onChange={handleChange(setSelectedPeriod, [setSelectedNrc])}
          placeholder="Selecciona el periodo..."
          isDisabled={!selectedModel}
          instanceId="period-select"
        />

        <FiltersSelect
          options={filtersData.nrc}
          value={selectedNrc}
          onChange={handleChange(setSelectedNrc)}
          placeholder="Selecciona el NRC..."
          isDisabled={!selectedPeriod}
          instanceId="nrc-select"
        />
      </div>


      <StudentsTable
        students={filteredStudents}
        handleOpenModal={(student) => handleOpenModal(student, false)} // Siempre "Ver más"
        styles={styles}
        selectedNrc={selectedNrc}
      />



      <div className={styles.containerIconAdd}>
        <span
          onClick={() => handleOpenModal(null, true)}
          className={`${styles.iconAdd} ${filteredStudents.length === 0 ?
            styles.disabled : styles.enabled}`}>+</span>

      </div>

      {isModalOpen && (
        <Modal
          data={modalData}
          isAddingStudent={isAddingStudent}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
}
