import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTablePlagues.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import RegisterPlague from "../CRUD/Register/RegisterPlague";
import EditPlague from "../CRUD/Edit/EditPlague";
import DeletePlague from "../CRUD/Delete/DeletePlague";

const DTablePlagues = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlagues, setFilteredPlagues] = useState([]);
  const [idPlague, setIDPlague] = useState("");
  const [isDataLoaded, setDataLoaded] = useState(false);
  

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

  const [showRegisterPlague, setShowRegisterPlague] = useState(false);
  const [showEditPlague, setShowEditPlague] = useState(false);
  const [showDeletePlague, setShowDeletePlague] = useState(false);
  const [plagues, setPlagues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const getPlagues = async () => {
      try {
        setIsLoading(true); // Indicar que se están cargando las plagas
        const response = await fetch(`http://localhost:3000/plague/`);
        if (response.status === 200) {
          const data = await response.json();
          setPlagues(data);
          setFilteredPlagues(data);
        } else if (response.status === 404) { 
          setPlagues([]);
          setFilteredPlagues([]);
        }
        setDataLoaded(true);
      } catch (error) {
        console.error("Error al cargar los datos de las plagas:", error);
        toast.error("Hubo un problema al cargar los datos de las plagas. Por favor, inténtelo nuevamente más tarde.");
      } finally {
          setIsLoading(false);
      }
    };
    if (!isDataLoaded) {
      getPlagues();
    }
  }, [isDataLoaded]);

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

  const handleRegisterClick = () => {
    setShowRegisterPlague(true);
  };

  const handleCancelClick = () => {
    setShowRegisterPlague(false);
    setShowEditPlague(false);
    setShowDeletePlague(false);
    setDataLoaded(false);
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
        className="design-table-plagues"
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
        pagination
        paginationPerPage={4} // Número de filas por página fijo
        paginationRowsPerPageOptions={[4,12]} 
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
        noDataComponent={isLoading ? ( // Mostrar mensaje de carga si isLoading es true
              <div className="no-beds-message">
                Espere un momento, las datos de las plagas se están cargando...
              </div>
            ) : (
              <div className="no-beds-message">
                Aún no se han registrado plagas.
              </div>
            )}
        />
      {showRegisterPlague && (
        <RegisterPlague onCancelClick={handleCancelClick} />
      )}
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
