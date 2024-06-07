import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableFarmers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import RegisterFarmer from "../CRUD/Register/RegisterFarmer";
import EditFarmer from "../CRUD/Edit/EditFarmer";
import DeleteFarmer from "../CRUD/Delete/DeleteFarmer";

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
      width: "auto",
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFarmers = async () => {
      try {
        setIsLoading(true); // Indicar que se están cargando los agricultores
        const response = await fetch(`http://localhost:3000/farmer/`);
        if (response.status === 200) {
          const data = await response.json();
          setFarmers(data);
          setFilteredFarmers(data);
        } else if (response.status === 404) { 
          setFarmers([]);
          setFilteredFarmers([]);
        }
      } catch (error) {
        console.error("Error al cargar los datos de los agricultores:", error);
        toast.error("Hubo un problema al cargar los datos de los agricultores. Por favor, inténtelo nuevamente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    getFarmers();
  }, []);

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
          noDataComponent={isLoading ? ( // Mostrar mensaje de carga si isLoading es true
              <div className="no-beds-message">
                Espere un momento, las datos de los agricultores se están cargando...
              </div>
            ) : (
              <div className="no-beds-message">
                Aún no se han registrado agricultores en este invernadero.
              </div>
            )}
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
