import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./DTableGreenhouses.css";
import RegisterGreenhouse from "../CRUD/Register/RegisterGreenhouse";
import EditGreenhouse from "../CRUD/Edit/EditGreenhouse";
import DeleteGreenhouse from "../CRUD/Delete/DeleteGreenhouse";
import { useNavigate, useParams } from "react-router-dom";

const DTableGreenhouses = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredGreenhouses, setFilteredGreenhouses] = useState([]);
  const [idGreenhouse, setIDGreenhouse] = useState("");
  const [nameGreenhouse, setNameGreenhouse] = useState("");
  const [nameFarmer, setNameFarmer] = useState("");
  const navigate = useNavigate();

  //   const { idGreenhouse } = useParams();
  // const params = useParams();
  // console.log(params);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_invernadero,
      sortable: true,
      width: "65px",
    },
    {
      name: "Nombre del invernadero",
      selector: (row) => row.nombre,
      sortable: true,
      width: "260px",
    },
    {
      name: "Tipo de invernadero",
      selector: (row) => row.tipo_invernadero,
      sortable: true,
      width: "230px",
    },
    {
      name: "Humedad",
      selector: (row) => row.humedad,
      sortable: true,
      width: "110px",
    },
    {
      name: "Tamaño",
      selector: (row) => row.tamanio,
      sortable: true,
      width: "110px",
    },
    {
      name: "Agricultor responsable",
      selector: (row) => row.nombre_agricultor,
      width: "260px",
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
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => handleShowBeds(row)}
            className="view-icon"
            size="lg"
          />
        </div>
      ),
      width: "auto",
    },
  ];

  const data = [];

  const [showRegisterGreenh, setshowRegisterGreenh] = useState(false); //Form de register
  const [showEditGreenh, setshowEditGreenh] = useState(false); //Form de edicion
  const [showDeleteGreenh, setshowDeleteGreenh] = useState(false); //Form de eliminacion
  const [showDataTableBeds, setshowDataTableBeds] = useState(true); //Form para ver las camas de un invernadero
  const [greenhouses, setGreenhouses] = useState(data);

  useEffect(() => {
    getGreenhouses();
  }, []);

  /*FUNCIONES*/
  async function getGreenhouses() {
    const response = await fetch(`http://localhost:3000/greenhouse/`);
    if (response.status === 200) {
      const data = await response.json();
      //se están cargando los datos
      setGreenhouses(data);
      setFilteredGreenhouses(data);
    }
  }

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      //dividir el texto para separar los valores de búsqueda
      const searchValue = value.split(" ");
      const filtered = greenhouses.filter((greenhouse) => {
        return searchValue.every(
          (value) =>
            greenhouse.nombre.toLowerCase().includes(value) ||
            greenhouse.nombre_agricultor.toLowerCase().includes(value)
        );
      });
      //muestra los agricultores filtrados
      setFilteredGreenhouses(filtered);
    } else {
      setFilteredGreenhouses(greenhouses);
    }
  };

  const handleRegisterClick = () => {
    setshowRegisterGreenh(true);
  };

  const handleCancelClick = () => {
    setshowRegisterGreenh(false);
    setshowEditGreenh(false);
  };

  const handleEditClick = (row) => {
    setIDGreenhouse(row.id_invernadero);
    setshowEditGreenh(true);
  };

  const handleDeleteClick = (row) => {
    setIDGreenhouse(row.id_invernadero);
    setshowDeleteGreenh(true);
  };

  // const handleShowBeds = (row) => {
  //     setIDGreenhouse(row.id_invernadero);
  //     setNameGreenhouse(row.nombre);
  //     setNameFarmer(row.nombre_agricultor);
  //     navigate(`/homeAdmin/invernaderos/${row.nombre}`);
  // };

  const handleShowBeds = (row) => {
    navigate(`/homeAdmin/invernaderos/${row.id_invernadero}`, {
      state: {
        idGreenhouse: row.id_invernadero,
        nameGreenhouse: row.nombre,
        nameFarmer: row.nombre_agricultor,
      },
    });
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-greenhouse-admin">
      <DataTable
        title={
          <div>
            {" "}
            <h4>Invernaderos</h4>
            <label className="description-greenhouse">
              Lista de todos los invernaderos que existen en el sistema
            </label>
          </div>
        }
        columns={columns}
        //Considerando el filtro
        data={filteredGreenhouses}
        responsive={true}
        selectableRows
        fixedHeader
        pagination
        paginationComponentOptions={paginacionOpciones}
        actions={
          <div className="header-table-greenhouse">
            <FontAwesomeIcon icon={faSearch} className="search" />
            <input
              type="text"
              placeholder="Buscar..."
              value={inputValue}
              onChange={handleFilter}
              className="searchDisease"
            />
            <button
              type="button"
              className="buttonInvernadero"
              onClick={handleRegisterClick}
            >
              Registrar invernadero
            </button>
          </div>
        }
        noDataComponent={
          <div style={{ marginTop: "15%" }}>
            No hay invernaderos registrados
          </div>
        }
      />
      {showRegisterGreenh && (
        <RegisterGreenhouse onCancelClick={handleCancelClick} />
      )}
      {}
      {showEditGreenh && (
        <EditGreenhouse
          onCancelClick={handleCancelClick}
          idGreenhouse={idGreenhouse}
        />
      )}
      {showDeleteGreenh && (
        <DeleteGreenhouse
          onCancelClick={handleCancelClick}
          idGreenhouse={idGreenhouse}
        />
      )}
    </div>
  );
};

export default DTableGreenhouses;
