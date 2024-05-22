import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./DTablePlagues.css";
import RegisterPlague from "../CRUD/Register/RegisterPlague";
import EditPlague from "../CRUD/Edit/EditPlague";
import DeletePlague from "../CRUD/Delete/DeletePlague";
/*Plagas*/

const DTablePlagues = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlagues, setFilteredPlagues] = useState([]);
  const [idPlague, setIDPlague] = useState("");

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_plaga,
      sortable: true,
      width: "65px",
    },
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
    {
      name: "Acciones",
      cell: (row) => (
        <div className="icons-container">
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => handleEditClick(row)}
            className="edit-icon"
            size="lg"
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDeleteClick(row)}
            className="delete-icon"
            size="lg"
          />
        </div>
      ),
      width: "90px",
    },
  ];

  const [showRegisterPlague, setShowRegisterPlague] = useState(false); //Form de register
  const [showEditPlague, setShowEditPlague] = useState(false); //Form de edicion
  const [showDeletePlague, setShowDeletePlague] = useState(false); //Form de eliminacion
  const [plagues, setPlagues] = useState([]);

  useEffect(() => {
    getPlagues();
  }, []);

  /*FUNCIONES*/
  async function getPlagues() {
    const response = await fetch(`http://localhost:3000/plague/`);
    const data = await response.json();
    setPlagues(data);
    setFilteredPlagues(data);
  }

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      //dividir el texto para separar los valores de búsqueda
      const searchValue = value.split(" ");
      const filtered = plagues.filter((plague) => {
        return searchValue.every(
          (value) =>
            plague.nombre.toLowerCase().includes(value) ||
            plague.nombre_cientifico.toLowerCase().includes(value)
        );
      });
      //muestra los agricultores filtrados
      setFilteredPlagues(filtered);
    } else {
      setFilteredPlagues(plagues);
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterPlague(true);
  };

  const handleCancelClick = () => {
    setShowRegisterPlague(false);
    setShowEditPlague(false);
    setShowDeletePlague(false);
  };

  const handleEditClick = (row) => {
    setShowEditPlague(true);
    setIDPlague(row.id_plaga);
  };

  const handleDeleteClick = (row) => {
    setShowDeletePlague(true);
    setIDPlague(row.id_plaga);
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
        title={
          <div>
            {" "}
            <h4>Plagas</h4>
            <label className="description">
              Lista de plagas en los invernaderos
            </label>
          </div>
        }
        columns={columns}
        //considerando el filtro
        data={filteredPlagues}
        responsive={true}
        selectableRows
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
            <button
              type="button"
              className="buttonPlaga"
              onClick={handleRegisterClick}
            >
              Registrar plaga
            </button>
          </div>
        }
        noDataComponent={
          <div style={{ marginTop: "15%" }}>Aún no hay plagas registradas</div>
        }
      />
      {showRegisterPlague && (
        <RegisterPlague onCancelClick={handleCancelClick} />
      )}{" "}
      {}
      {showEditPlague && (
        <EditPlague onCancelClick={handleCancelClick} idPlague={idPlague} />
      )}
      {showDeletePlague && (
        <DeletePlague onCancelClick={handleCancelClick} idPlague={idPlague} />
      )}
    </div>
  );
};

export default DTablePlagues;
