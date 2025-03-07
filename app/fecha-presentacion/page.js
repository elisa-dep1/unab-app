"use client";
import { useState, useEffect } from "react";
import data from "../../src/data/filters.json";
import style from "./pres.module.css"

export default function DatePresentationPage() {
  const [authorized, setAuthorized] = useState({});

  useEffect(() => {
    setAuthorized({});
  }, []); // Se asegura de que el estado solo se establezca en el cliente

  const toggleAuthorization = (id) => {
    setAuthorized((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={style.containerGeneral}>
      <div  className={style.table}>
        <table>
          <thead>
            <tr>
              <th> Nombre alumno </th>
              <th> Autorización </th>
            </tr>
          </thead>
          <tbody>
            {data.student.map((student) => (
              <tr key={student.value}>
                <td>{student.label}</td>
                <td onClick={() => toggleAuthorization(student.value)} style={{ cursor: "pointer" }}>
                  {authorized[student.value] ?
                    <span>✔</span>
                    :
                    <span>&nbsp;</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={style.saveButton}> Guardar </button>
      </div>

      <div className={style.tabletwo}>
        <table className={style}>
          <thead>
            <tr>
              <th> Nombre alumno </th>
              <th> Fecha </th>
              <th> Sala </th>
              <th> Editar </th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        <button className={style.saveButton}>Guardar</button>
      
      </div>

    </div>

  );
}
