import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableGreenhouses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilAlt, faTrash, faEye} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterGreenhouse from "../CRUD/Register/RegisterGreenhouse";
import EditGreenhouse from "../CRUD/Edit/EditGreenhouse";
import DeleteGreenhouse from "../CRUD/Delete/DeleteGreenhouse";

const DTableGreenhouses = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredGreenhouses, setFilteredGreenhouses] = useState([]);
  const [idGreenhouse, setIDGreenhouse] = useState("");

  const navigate = useNavigate();

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
      width: "280px",
    },
    {
      name: "Tipo de invernadero",
      selector: (row) => row.tipo_invernadero,
      sortable: true,
      width: "180px",
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
      width: "130px",
    },
    {
      name: "Agricultor responsable",
      selector: (row) => row.nombre_agricultor,
      width: "auto",
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
      width: "100px",
    },
  ];

  const [showRegisterGreenh, setshowRegisterGreenh] = useState(false); //Form de register
  const [showEditGreenh, setshowEditGreenh] = useState(false); //Form de edicion
  const [showDeleteGreenh, setshowDeleteGreenh] = useState(false); //Form de eliminacion
  const [greenhouses, setGreenhouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getGreenhouses = async () => {
      try {
        setIsLoading(true); // Indicar que se están cargando los invernaderos
        const response = await fetch(`http://localhost:3000/greenhouse/`);
        if (response.status === 200) {
          const data = await response.json();
          //se están cargando los datos
          setGreenhouses(data);
          setFilteredGreenhouses(data);
        } else if (response.status === 404) { 
          setGreenhouses([]);
          setFilteredGreenhouses([]);
        }
      } catch (error) {
        console.error("Error al cargar los datos de los invernaderos:", error);
        toast.error("Hubo un problema al cargar los datos de los invernaderos. Por favor, inténtelo nuevamente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    getGreenhouses();
  }, []);

  const handleFilter = (event) => {
    try {
      const value = event.target.value.toLowerCase();
      setInputValue(value);
      if (value) {
        const searchValue = value.split(" ");
        const filtered = greenhouses.filter((greenhouse) => {
          return searchValue.every(
            (value) =>
              greenhouse.nombre.toLowerCase().includes(value) ||
              greenhouse.nombre_agricultor.toLowerCase().includes(value)
          );
        });
        setFilteredGreenhouses(filtered);
      } else {
        setFilteredGreenhouses(greenhouses);
      }
    } catch (error) {
      console.error("Error durante el filtrado:", error);
      alert("Error durante el filtrado de invernaderos");
    }
  };

  const handleRegisterClick = () => {
    setshowRegisterGreenh(true);
  };

  const handleCancelClick = () => {
    setshowRegisterGreenh(false);
    setshowEditGreenh(false);
    setshowDeleteGreenh(false);
    console.log("Sali del handle Cancel CLick con");
  };

  const handleEditClick = (row) => {
    setIDGreenhouse(row.id_invernadero);
    setshowEditGreenh(true);
  };

  const handleDeleteClick = (row) => {
    setIDGreenhouse(row.id_invernadero);
    setshowDeleteGreenh(true);
  };

  const handleShowBeds = (row) => {
    try {
      navigate(`/homeAdmin/invernaderos/camas`, {
        state: {
          idGreenhouse: row.id_invernadero,
          nameGreenhouse: row.nombre,
          nameFarmer: row.nombre_agricultor,
        },
      });
    } catch (error) {
      console.error("Error al navegar a la sección de camas:", error);
      alert("Error al intentar mostrar las camas del invernadero");
    }
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
        noDataComponent={isLoading ? ( // Mostrar mensaje de carga si isLoading es true
              <div className="no-beds-message">
                Espere un momento, los datos de los invernaderos se están cargando...
              </div>
            ) : (
              <div className="no-beds-message">
                Aún no se han registrado invernaderos.
              </div>
            )}
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