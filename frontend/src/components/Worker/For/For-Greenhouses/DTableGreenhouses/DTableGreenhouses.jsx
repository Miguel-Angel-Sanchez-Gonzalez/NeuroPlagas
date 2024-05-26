import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableGreenhouses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import RegisterGreenhouse from "../CRUD/Register/RegisterGreenhouse";
import EditGreenhouse from "../CRUD/Edit/EditGreenhouse";
import DeleteGreenhouse from "../CRUD/Delete/DeleteGreenhouse";
//WORKER
const DTableGreenhouses = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredGreenhouses, setFilteredGreenhouses] = useState([]);
  const [idGreenhouse, setIDGreenhouse] = useState("");
  const navigate = useNavigate();
  const idFarmer = localStorage.getItem("idFarmer");
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    if (!isLoaded) {
      getGreenhouses();
    }
  }, [isLoaded]);

  /*FUNCIONES*/
  async function getGreenhouses() {
    try {
      const response = await fetch(
        `http://localhost:3000/greenhouse/farmer/${idFarmer}`
      );
      if (response.status === 200) {
        const data = await response.json();
        //se están cargando los datos
        setGreenhouses(data);
        setFilteredGreenhouses(data);
        setIsLoaded(true);
      } else {
        throw new Error("Error al obtener los invernaderos");
      }
    } catch (error) {
      console.error("Error al obtener los invernaderos:", error);
      alert("Error al obtener los invernaderos, inténtelo más tarte:");
    }
  }

  const handleFilter = (event) => {
    try {
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
    } catch (error) {
      console.error("Error durante el filtrado:", error);
      alert("Error durante el filtrado de invernaderos " + error);
    }
  };

  const handleRegisterClick = () => {
    setshowRegisterGreenh(true);
  };

  const handleCancelClick = () => {
    setshowRegisterGreenh(false);
    setshowEditGreenh(false);
    setshowDeleteGreenh(false);
    setIsLoaded(false);
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
      console.log(row.id_invernadero);
      navigate(`/homeFarmer/invernaderos/camas`, {
        state: {
          idGreenhouse: row.id_invernadero,
          nameGreenhouse: row.nombre,
        },
      });
    } catch (error) {
      console.error("Error al navegar a la sección de camas:", error);
    }
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    // <div className="table-greenhouse-farmer">
    //   <div>
    //     <h2 className="h2admin">
    //       Bienvenido <span className="rol-admin">agricultor</span>
    //     </h2>
    //   </div>
    //   <DataTable
    //     title={
    //       <div>
    //         {" "}
    //         <h4>Invernaderos</h4>
    //         <label className="description-greenhouse">
    //           Lista de todos los invernaderos que tienes registrados
    //         </label>
    //       </div>
    //     }
    //     columns={columns}
    //     //Considerando el filtro
    //     data={filteredGreenhouses}
    //     responsive={true}
    //     fixedHeader
    //     pagination
    //     paginationComponentOptions={paginacionOpciones}
    //     actions={
    //       <div className="header-table-greenhouse">
    //         <FontAwesomeIcon icon={faSearch} className="search" />
    //         <input
    //           type="text"
    //           placeholder="Buscar..."
    //           value={inputValue}
    //           onChange={handleFilter}
    //           className="searchDisease"
    //         />
    //         <button
    //           type="button"
    //           className="buttonInvernadero"
    //           onClick={handleRegisterClick}
    //         >
    //           Registrar invernadero
    //         </button>
    //       </div>
    //     }
    //     noDataComponent={
    //       <div className="no-beds-message">No hay invernaderos registrados</div>
    //     }
    //   />
    //   {showRegisterGreenh && (
    //     <RegisterGreenhouse onCancelClick={handleCancelClick} />
    //   )}
    //   {showEditGreenh && (
    //     <EditGreenhouse
    //       onCancelClick={handleCancelClick}
    //       idGreenhouse={idGreenhouse}
    //     />
    //   )}
    //   {showDeleteGreenh && (
    //     <DeleteGreenhouse
    //       onCancelClick={handleCancelClick}
    //       idGreenhouse={idGreenhouse}
    //     />
    //   )}
    // </div>
    <div>En construccion</div>
  );
};

export default DTableGreenhouses;
