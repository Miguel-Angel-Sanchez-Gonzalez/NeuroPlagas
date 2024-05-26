import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTablePlagues.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const DTablePlagues = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlagues, setFilteredPlagues] = useState([]);

  const columns = [
    {
      name: "Nombre de la plaga",
      selector: (row) => row.nombre,
      sortable: true,
      width: "170px",
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
  const [plagues, setPlagues] = useState([]);

  useEffect(() => {
    getPlagues();
  }, []);

  async function getPlagues() {
    try {
      const response = await fetch(`http://localhost:3000/plague/`);
      if (response.status === 200) {
        const data = await response.json();
        setPlagues(data);
        setFilteredPlagues(data);
      } else {
        throw new Error("Error al obtener las plagas");
      }
    } catch (error) {
      console.error("Error al cargar los datos de las plagas:", error);
      alert("Error al obtener las plagas, inténtelo más tarte:");
    }
  }

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      const searchValue = value.split(" ");
      const filtered = plagues.filter((plague) => {
        return searchValue.every(
          (value) =>
            plague.nombre.toLowerCase().includes(value) ||
            plague.nombre_cientifico.toLowerCase().includes(value)
        );
      });
      setFilteredPlagues(filtered);
    } else {
      setFilteredPlagues(plagues);
    }
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-plagues-admin">
      <DataTable
        className="custom-table-plagues"
        title={
          <div>
            <h4>Plagas</h4>
            <label className="description">
              Lista de plagas en los invernaderos
            </label>
          </div>
        }
        columns={columns}
        data={filteredPlagues}
        responsive={true}
        fixedHeader
        pagination
        paginationComponentOptions={paginacionOpciones}
        actions={
          <div className="header-table-plagues">
            <FontAwesomeIcon icon={faSearch} className="search" />
            <input
              type="text"
              placeholder="Buscar..."
              value={inputValue}
              onChange={handleFilter}
              className="searchPlague"
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

export default DTablePlagues;
