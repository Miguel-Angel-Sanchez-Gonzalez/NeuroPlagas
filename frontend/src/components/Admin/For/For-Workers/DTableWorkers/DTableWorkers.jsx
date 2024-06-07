import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./DTableWorkers.css";
import RegisterWorker from "../CRUD/Register/RegisterWorker";
import EditWorker from "../CRUD/Edit/EditWorker";
import DeleteWorker from "../CRUD/Delete/DeleteWorker";

/*Trabajadores*/

const DTableWorkers = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [idWorker, setIDWorker] = useState("");

  const navigate = useNavigate();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_trabajador,
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
      name: "Ver invernaderos",
      cell: (row) => (
        <div>
          <button
            className="verInvernaderos-button"
            onClick={() => handleShowGWorkers(row)}
          >
            Listar
          </button>
        </div>
      ),
      width: "120px",
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      width: "130px",
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
      width: "100px",
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

  const [showRegisterWorker, setShowRegisterWorker] = useState(false); //Form de register
  const [showEditWorker, setShowEditWorker] = useState(false); //Form de edicion
  const [showDeleteWorker, setShowDeleteWorker] = useState(false); //Form de eliminacion
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getWorkers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/worker/`);
        if (response.status === 200) {
          const data = await response.json();
          setWorkers(data);
          setFilteredWorkers(data);
        } else if (response.status === 404) {
          setWorkers([]);
          setFilteredWorkers([]);
        }
      } catch (error) {
        console.error("Error al obtener los trabajadores:", error);
        toast.error("Hubo un problema al cargar los datos de los trabajadores. Por favor, inténtelo nuevamente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };
      getWorkers();
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      //dividir el texto para separar los valores de búsqueda
      const searchValue = value.split(" ");
      const filtered = workers.filter((worker) => {
        return searchValue.every(
          (value) =>
            worker.nombre.toLowerCase().includes(value) ||
            worker.primer_apellido.toLowerCase().includes(value) ||
            worker.segundo_apellido.toLowerCase().includes(value)
        );
      });

      //muestra los agricultores filtrados
      setFilteredWorkers(filtered);
    } else {
      setFilteredWorkers(workers);
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterWorker(true);
  };

  const handleCancelClick = () => {
    setShowRegisterWorker(false);
    setShowEditWorker(false);
    setShowDeleteWorker(false);
  };

  const handleEditClick = (row) => {
    //console.log("ID del registro a actualizar:", row.id_trabajador);
    setShowEditWorker(true);
    setIDWorker(row.id_trabajador);
  };

  const handleDeleteClick = (row) => {
    //console.log("ID del registro a eliminar:", row.id_trabajador);
    setShowDeleteWorker(true);
    setIDWorker(row.id_trabajador);
  };

  //Para ver la tabla de invernaderos
  const handleShowGWorkers = (row) => {
    try {
      navigate(`/homeAdmin/trabajadores/${row.nombre}`, {
        state: {
          idWorker: row.id_trabajador,
          nameWorker: row.nombre,
        },
      });
    } catch (error) {
      console.error(
        "Error al navegar a la sección de lo invernaderos asignados a un trabajador:",
        error
      );
      alert(
        "Error al intentar mostrar los invernaderos asignados a un trabajador"
      );
    }
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-worker-admin">
      <DataTable
        title={
          <div>
            {" "}
            <h4>Trabajadores</h4>
            <label className="description-worker">
              Lista de todos los trabajadores que existen en el sistema
            </label>
          </div>
        }
        columns={columns}
        //se está considerando el filtro
        data={filteredWorkers}
        responsive={true}
        fixedHeader
        pagination
        paginationComponentOptions={paginacionOpciones}
        actions={
          <div className="header-table-worker">
            <FontAwesomeIcon icon={faSearch} className="search" />
            <input
              type="text"
              placeholder="Buscar..."
              value={inputValue}
              onChange={handleFilter}
              className="searchWorker"
            />
            <button
              type="button"
              className="buttonTrabajador"
              onClick={handleRegisterClick}
            >
              Registrar trabajador
            </button>
          </div>
        }
        noDataComponent={isLoading ? ( // Mostrar mensaje de carga si isLoading es true
              <div className="no-beds-message">
                Espere un momento, los datos de los trabajadores se están cargando...
              </div>
            ) : (
              <div className="no-beds-message">
                Aún no se han registrado trabajadores.
              </div>
            )}
        />
      {showRegisterWorker && (
        <RegisterWorker onCancelClick={handleCancelClick} />
      )}{" "}
      {}
      {showEditWorker && (
        <EditWorker onCancelClick={handleCancelClick} idWorker={idWorker} />
      )}
      {showDeleteWorker && (
        <DeleteWorker onCancelClick={handleCancelClick} idWorker={idWorker} />
      )}
    </div>
  );
};

export default DTableWorkers;
