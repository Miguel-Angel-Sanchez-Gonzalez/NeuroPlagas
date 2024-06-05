import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableWorkerGreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useParams } from "react-router-dom";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

/*Trabajadores*/

const DTableWorkerGreen = ({ isLoading, noGreenworkerMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredGreenWorker, setFilteredGreenWorker] = useState([]);
  const [idWorker, setIDWorker] = useState("");
  const [nameWorker, setNameWorker] = useState("");

  //Para ver las imagenes analizadas de una cama
  const location = useLocation();

  const { idWorker: paramIdWorker } = useParams();

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
      width: "300px",
    },
    {
      name: "Tipo de invernadero",
      selector: (row) => row.tipo_invernadero,
      sortable: true,
      width: "300px",
    },
    {
      name: "Agricultor responsable",
      selector: (row) => row.nombre_agricultor,
      sortable: true,
      width: "300px",
    },
    {
      name: "Acciones",
      cell: (row) => (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleDeleteClick(row)}
          className="delete-icon"
          size="lg"
        />
      ),
      width: "100px",
    },
  ];

  const [showDeleteWorker, setShowDeleteWorker] = useState(false); //Form de eliminacion
  const [greenWorkers, setGreenWorker] = useState([]);

  useEffect(() => {
    if (location.state) {
      const { idWorker, nameWorker } = location.state;
      setIDWorker(idWorker);
      setNameWorker(nameWorker);
      getGreenhouseByIdWorker(idWorker);
    } else if (paramIdWorker) {
      setIDWorker(paramIdWorker);
      getGreenhouseByIdWorker(paramIdWorker);
    }
  }, [location.state, paramIdWorker]);

  /*FUNCIONES*/
  const getGreenhouseByIdWorker = async (idWorker) => {
    try {
      const response = await fetch(
        `http://localhost:3000/worker/getgreenhouses/${idWorker}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setGreenWorker(data);
        setFilteredGreenWorker(data);
      } else {
        throw new Error("Error al obtener los invernaderos del trabajador");
      }
    } catch (error) {
      console.error("Error al obtener los invernaderos del trabajador:", error);
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      const searchValue = value.split(" ");
      const filtered = greenWorkers.filter((green) =>
        searchValue.every((val) => green.nombre.toLowerCase().includes(val))
      );
      setFilteredGreenWorker(filtered);
    } else {
      setFilteredGreenWorker(greenWorkers);
    }
  };

  const handleAsignGreenhouse = (row) => {
    setIDWorker(row.id_trabajador);
  };

  const handleDeleteClick = (row) => {
    //console.log("ID del registro a eliminar:", row.id_trabajador);
    setShowDeleteWorker(true);
    setIDWorker(row.id_trabajador);
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-workgreen-admin">
      <div className="right-content-workgreen">
        <h1 className="h2green-workgreen">
          Trabajador <span className="name-greenworker"> {nameWorker}</span>
        </h1>

        <div className="only-table-workgreen">
          <div className="title-and-search-workgreen">
            <div>
              <h3>Invernaderos asignados</h3>
              <label className="description-workgreen">
                Lista de los invernaderos que tiene asignado el trabajador
              </label>
            </div>
            <div className="header-table-workgreen">
              <FontAwesomeIcon
                icon={faSearch}
                className="icon-workgreen"
                size="lg"
              />
              <input
                type="text"
                placeholder="Buscar..."
                value={inputValue}
                onChange={handleFilter}
                className="search-workgreen"
              />
              <button
                type="button"
                className="buttonWorkgreen"
                onClick={handleAsignGreenhouse}
              >
                Asignar invernadero
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="loading-message">
              Espere un momento, se están cargando los invernaderos...
            </div>
          ) : filteredGreenWorker.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredGreenWorker}
              responsive={true}
              fixedHeader
              pagination
              paginationComponentOptions={paginacionOpciones}
            />
          ) : (
            <div className="no-workgreen-message">
              {noGreenworkerMessage ||
                "Aún no se han asignado invernaderos para este trabajador."}
            </div>
          )}
        </div>
      </div>
      {/* {showDeleteWorker && (
              <DeleteWorker onCancelClick={handleCancelClick} idWorker={idWorker} />
          )} */}
    </div>
  );
};

export default DTableWorkerGreen;
