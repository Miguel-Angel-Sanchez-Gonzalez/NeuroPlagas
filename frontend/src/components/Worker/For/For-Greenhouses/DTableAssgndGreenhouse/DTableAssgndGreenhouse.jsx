import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableAssgndGreenhouse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//Invernaderos asignados del trabajador

const DTableAssgndGreenhouse = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredGreenhouses, setFilteredGreenhouses] = useState([]);
  const [idGreenhouse, setIDGreenhouse] = useState("");
  const [isDataLoaded, setDataLoaded] = useState(false);

  const navigate = useNavigate();
  const nameWorker = localStorage.getItem("username");
 
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_trabajadorinvernadero,
      sortable: true,
      width: "65px",
    },
    {
      name: "Nombre del invernadero",
      selector: (row) => row.nombre,
      sortable: true,
      width: "350px",
    },
    {
      name: "Tipo de invernadero",
      selector: (row) => row.tipo_invernadero,
      sortable: true,
      width: "200px",
    },
    {
      name: "Humedad",
      selector: (row) => row.humedad,
      sortable: true,
      width: "130px",
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
      sortable: true,
      width: "auto",
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="icons-container">
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => handleShowBeds(row)}
            className="view-icon-workergren"
            size="lg"
          />
        </div>
      ),
      width: "100px",
    },
  ];
  const [greenhouses, setGreenhouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isDataLoaded) {
      getGreenhousesByIdWorker();
    }
  }, [isDataLoaded]);

  const getGreenhousesByIdWorker = async () => {
    try {
      setIsLoading(true);
      const idWorker = localStorage.getItem("idWorker");
      const response = await fetch(`http://localhost:3000/worker/getgreenhouses/${idWorker}`);
      if (response.status === 200) {
        const data = await response.json();
        setGreenhouses(data);
        setFilteredGreenhouses(data);
      } else if (response.status === 404) { 
        setGreenhouses([]);
        setFilteredGreenhouses([]);
      }
      setDataLoaded(true);
    } catch (error) {
      console.error("Error al cargar los datos de los invernaderos:", error);
      toast.error("Hubo un problema al cargar los datos de los invernaderos. Por favor, inténtelo nuevamente más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      const searchValue = value.split(" ");
      const filtered = greenhouses.filter((greenhouse) => {
        return searchValue.every((value) =>
          greenhouse.nombre.toLowerCase().includes(value)
        );
      });
      setFilteredGreenhouses(filtered);
    } else {
      setFilteredGreenhouses(greenhouses);
    }
  };

  // const handleCancelClick = () => {
  //   setDataLoaded(false);
  // };

  const handleShowBeds = (row) => {
    setIDGreenhouse(row.id_invernadero);
    navigate(`/homeWorker/invernaderos/camas`, {
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
    <div className="table-bed-worker">
      <div className="right-content-bed">
        <h1 className="h2green-bed">
          Bienvenido <span className="name-greenworker"> {nameWorker}</span>. ¡Es hora de trabajar!
        </h1>
      <div className="only-table-bed">
        <div className="title-and-search-bed">
          <div>
            <h3>Invernaderos</h3>
            <label className="description-bed">
              Lista de todos los invernaderos asignado a usted.
            </label>
          </div>
          <div className="header-table-bed">
            <FontAwesomeIcon icon={faSearch} className="icon-bed" size="lg" />
            <input
              type="text"
              placeholder="Buscar..."
              value={inputValue}
              onChange={handleFilter}
              className="search-bed"
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredGreenhouses}
          responsive={true}
          fixedHeader
          pagination
          paginationComponentOptions={paginacionOpciones}
          noDataComponent={isLoading ? (
            <div className="no-beds-message">
              Espere un momento, los datos de los invernaderos se están cargando...
            </div>
          ) : (
            <div className="no-beds-message">
              Aún no se han registrado invernaderos.
            </div>
          )}
        />
      </div>
    </div>
    </div>
  );
};

export default DTableAssgndGreenhouse;