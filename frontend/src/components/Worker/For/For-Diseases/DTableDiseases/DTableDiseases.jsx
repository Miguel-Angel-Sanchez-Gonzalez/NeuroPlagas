import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./DTableDiseases.css";

/*Enfermedad*/

const DTableDiseases = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredDiseases, setFilteredDiseases] = useState([]);

  const columns = [
    {
      name: "Nombre de la enfermedad",
      selector: (row) => row.nombre,
      sortable: true,
      width: "200px",
    },
    {
      name: "Nombre científico",
      selector: (row) => row.nombre_cientifico,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
      width: "300px",
    },
    {
      name: "Recomendaciones",
      selector: (row) => row.recomendaciones,
      sortable: true,
      width: "300px",
    },
    {
      name: "Acciones a tomar",
      selector: (row) => row.acciones,
      width: "300px",
    },
  ];

  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    getDiseases();
  }, []);

  /*FUNCIONES*/
  async function getDiseases() {
    try {
      const response = await fetch(`http://localhost:3000/disease`);
      if (response.status === 200) {
        const data = await response.json();
        setDiseases(data);
        setFilteredDiseases(data);
      } else {
        throw new Error("Error al obtener las enfermedades");
      }
    } catch (error) {
      console.error("Error al cargar los datos de las enfermedades:", error);
      alert("Error al obtener las enfermedades, inténtelo más tarte:");
    }
  }

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      //dividir el texto para separar los valores de búsqueda
      const searchValue = value.split(" ");
      const filtered = diseases.filter((disease) => {
        return searchValue.every(
          (value) =>
            disease.nombre.toLowerCase().includes(value) ||
            disease.nombre_cientifico.toLowerCase().includes(value)
        );
      });
      //muestrlas enfermedades filtrados
      setFilteredDiseases(filtered);
    } else {
      setFilteredDiseases(diseases);
    }
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-disease-admin">
      <DataTable
        className="custom-table-disease"
        title={
          <div>
            <h4>Enfermedades</h4>
            <label className="description">
              Lista de enfermedades en los invernaderos
            </label>
          </div>
        }
        columns={columns}
        //considerando el filtro
        data={filteredDiseases}
        responsive={true}
        fixedHeader
        pagination
        paginationComponentOptions={paginacionOpciones}
        actions={
          <div className="header-table-disease">
            <FontAwesomeIcon icon={faSearch} className="search" />
            <input
              type="text"
              placeholder="Buscar..."
              value={inputValue}
              onChange={handleFilter}
              className="searchDisease"
            />
          </div>
        }
        noDataComponent={
          <div className="no-beds-message">
            Aún no hay enfermedades registradas
          </div>
        }
      />
    </div>
  );
};

export default DTableDiseases;
