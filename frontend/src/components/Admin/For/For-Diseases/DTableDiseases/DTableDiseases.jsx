import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableDiseases.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import RegisterDisease from "../CRUD/Register/RegisterDisease";
import EditDisease from "../CRUD/Edit/EditDisease";
import DeleteDisease from "../CRUD/Delete/DeleteDisease";

/*Enfermedad*/

const DTableDiseases = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [idDisease, setIDDisease] = useState("");

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_enfermedad,
      sortable: true,
      width: "65px",
    },
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
      width: "350px",
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
      width: "250px",
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

  const [showRegisterDisease, setShowRegisterDisease] = useState(false); //Form de register
  const [showEditDisease, setShowEditDisease] = useState(false); //Form de edicion
  const [showDeleteDisease, setShowDeleteDisease] = useState(false); //Form de eliminacion
  const [diseases, setDiseases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDiseases = async () => {
      try {
        setIsLoading(true); // Indicar que se están cargando las enfermedades
        const response = await fetch(`http://localhost:3000/disease`);
        if (response.status === 200) {
          const data = await response.json();
          setDiseases(data);
          setFilteredDiseases(data);
        } else if (response.status === 404) {
          setDiseases([]);
          setFilteredDiseases([]);
        }
      } catch (error) {
        console.error("Error al obtener las enfermades:", error);
        toast.error("Hubo un problema al cargar los datos de las enfermedades. Por favor, inténtelo nuevamente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    getDiseases();
  }, []);

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

  const handleRegisterClick = () => {
    setShowRegisterDisease(true);
  };

  const handleCancelClick = () => {
    setShowRegisterDisease(false);
    setShowEditDisease(false);
    setShowDeleteDisease(false);
  };

  const handleEditClick = (row) => {
    setShowEditDisease(true);
    setIDDisease(row.id_enfermedad);
  };

  const handleDeleteClick = (row) => {
    setShowDeleteDisease(true);
    setIDDisease(row.id_enfermedad);
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
        className="design-table-disease"
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
        pagination
        paginationPerPage={4} // Número de filas por página fijo
        paginationRowsPerPageOptions={[4,12]} // Deshabilita el selector de filas por página mostrando solo 10
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
            <button
              type="button"
              className="buttonEnfermedad"
              onClick={handleRegisterClick}
            >
              Registrar enfermedad
            </button>
          </div>
        }
        noDataComponent={isLoading ? ( // Mostrar mensaje de carga si isLoading es true
              <div className="no-beds-message">
                Espere un momento, las enfermedades se están cargando...
              </div>
            ) : (
              <div className="no-beds-message">
                Aún no se han registrado enfermedades.
              </div>
            )}
          />
      {showRegisterDisease && (
        <RegisterDisease onCancelClick={handleCancelClick} />
      )}{" "}
      {}
      {showEditDisease && (
        <EditDisease onCancelClick={handleCancelClick} idDisease={idDisease} />
      )}
      {showDeleteDisease && (
        <DeleteDisease
          onCancelClick={handleCancelClick}
          idDisease={idDisease}
        />
      )}
    </div>
  );
};

export default DTableDiseases;
