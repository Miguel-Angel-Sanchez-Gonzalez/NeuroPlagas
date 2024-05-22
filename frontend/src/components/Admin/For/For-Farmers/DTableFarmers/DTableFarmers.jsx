import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./DTableFarmers.css";
import RegisterFarmer from "../CRUD/Register/RegisterFarmer";
import EditFarmer from "../CRUD/Edit/EditFarmer";
import DeleteFarmer from "../CRUD/Delete/DeleteFarmer";
import { useLocation } from "react-router-dom";
/*Agricultores*/

const DTableFarmers = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [idFarmer, setIDFarmer] = useState("");

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_agricultor,
      sortable: true,
      width: "65px",
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      width: "100px",
    },
    {
      name: "Primer apellido",
      selector: (row) => row.primer_apellido,
      sortable: true,
      width: "160px",
    },
    {
      name: "Segundo apellido",
      selector: (row) => row.segundo_apellido,
      sortable: true,
      width: "160px",
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      width: "140px",
    },
    {
      name: "Correo electrónico",
      selector: (row) => row.correo_electronico,
      width: "220px",
    },
    {
      name: "Usuario",
      selector: (row) => row.nombre_usuario,
      sortable: true,
      width: "100px",
    },
    {
      name: "Contraseña",
      selector: (row) => "********",
      width: "110px",
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

  const [showRegisterFarmer, setShowRegisterFarmer] = useState(false); //Form de register
  const [showEditFarmer, setShowEditFarmer] = useState(false); //Form de edicion
  const [showDeleteFarmer, setshowDeleteFarmer] = useState(false); //Form de eliminacion
  const [farmers, setFarmers] = useState([]);
  // Use location to detect route changes
  const location = useLocation();
  useEffect(() => {
    // console.log("Cargue los agricultores en la tabla");
    getFarmers();
  }, [location]);

  /*FUNCIONES*/
  async function getFarmers() {
    const response = await fetch(`http://localhost:3000/farmer/`);
    if (response.status === 200) {
      const data = await response.json();
      //se están cargando los datos
      // console.log("DATOS DE Agricultores:", data);
      setFarmers(data);
      setFilteredFarmers(data);
    }
  }

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      //dividir el texto para separar los valores de búsqueda
      const searchValue = value.split(" ");
      const filtered = farmers.filter((farmer) => {
        return searchValue.every(
          (value) =>
            farmer.nombre.toLowerCase().includes(value) ||
            farmer.primer_apellido.toLowerCase().includes(value) ||
            farmer.segundo_apellido.toLowerCase().includes(value)
        );
      });
      //muestra los agricultores filtrados
      setFilteredFarmers(filtered);
    } else {
      setFilteredFarmers(farmers);
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterFarmer(true);
  };

  const handleCancelClick = () => {
    setShowRegisterFarmer(false);
    setShowEditFarmer(false);
    setshowDeleteFarmer(false);
  };

  const handleEditClick = (row) => {
    //console.log("ID del registro a actualizar:", row.id_agricultor);
    setShowEditFarmer(true);
    setIDFarmer(row.id_agricultor);
  };

  const handleDeleteClick = (row) => {
    //console.log("ID del registro a eliminar:", row.id_agricultor);
    setshowDeleteFarmer(true);
    setIDFarmer(row.id_agricultor);
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div>
      <div>
        <h2 className="h2admin">
          Bienvenido <span className="rol-admin">administrador</span>
        </h2>
      </div>
      <div className="table-farmer-admin">
        <DataTable
          title={
            <div>
              {" "}
              <h4>Agricultores</h4>{" "}
              <label className="description-farmer">
                Lista de todos los agricultores que existen en el sistema
              </label>
            </div>
          }
          columns={columns}
          //se está considerando el filtro
          data={filteredFarmers}
          responsive={true}
          selectableRows
          fixedHeader
          pagination
          paginationComponentOptions={paginacionOpciones}
          actions={
            <div className="header-table-farmer">
              <FontAwesomeIcon icon={faSearch} className="search" />
              <input
                type="text"
                placeholder="Buscar..."
                value={inputValue}
                onChange={handleFilter}
                className="searchFarmer"
              />
              <button
                type="button"
                className="buttonAgricultor"
                onClick={handleRegisterClick}
              >
                Registrar agricultor
              </button>
            </div>
          }
          noDataComponent={
            <div style={{ marginTop: "15%" }}>
              Aún no hay agricultores registrados
            </div>
          }
        />
        {showRegisterFarmer && (
          <RegisterFarmer onCancelClick={handleCancelClick} />
        )}
        {showEditFarmer && (
          <EditFarmer onCancelClick={handleCancelClick} idFarmer={idFarmer} />
        )}
        {showDeleteFarmer && (
          <DeleteFarmer onCancelClick={handleCancelClick} idFarmer={idFarmer} />
        )}
      </div>
    </div>
  );
};

export default DTableFarmers;
