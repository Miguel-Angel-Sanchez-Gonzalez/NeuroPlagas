import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./DTableImagesA.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone'

const DTableImagesA = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredImagesA, setFilteredImagesA] = useState([]);
  const [files, setAcceptedFiles] = useState([]);
  const location = useLocation();

  const { idGreenhouse, nameGreenhouse, nameFarmer, idBed, numberBed } = location.state || [];

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_analizedImage,
      sortable: true,
      width: "65px",
    },
    {
      name: "Nombre de lo detectado",
      cell: (row) => {
        const detected = [...row.detected.plagues, ...row.detected.diseases]; // Combinar arrays de plagas y enfermedades

        return detected.join(", "); // Unir todo en un solo string separado por comas
      },
      sortable: true,
      width: "400px",
    },
    {
      name: "Tipo",
      cell: (row) => {
        const isPlague = row.detected.plagues.length > 0; // Verificar si hay plagas detectadas
        const isDisease = row.detected.diseases.length > 0; // Verificar si hay enfermedades detectadas
        if (isPlague && isDisease) {
          return "Plagas y enfermedades"; // Si se detecta tanto una plaga como una enfermedad
        } else if (isPlague) {
          return "Plaga"; // Si solo se detecta una plaga
        } else if (isDisease) {
          return "Enfermedad"; // Si solo se detecta una enfermedad
        } else {
          return "Desconocido"; // Si no se detecta ni plaga ni enfermedad
        }
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
      width: "150px",
    },
    {
      name: "Imagen",
      cell: (row) => (
        <div className="icons-container">
          <FontAwesomeIcon icon={faEye} className="view-icon" size="lg" />
        </div>
      ),
      width: "90px",
    },
  ];
  const [imagesAnalized, setImagesAnalized] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      getImageAByIdBed();
    }
  }, [isLoaded]);

  const getImageAByIdBed = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/analizedImage/greenhouse/bed/${idBed}`
      );
      if (response.status === 200 || response.status === 404) {
        const data = await response.json();
        setImagesAnalized(Array.isArray(data) ? data : []);
        setFilteredImagesA(Array.isArray(data) ? data : []);
        setIsLoaded(true);
      }
    } catch (error) {
      console.error(
        "Error al obtener las imágenes analizadas de la cama:",
        error
      );
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });



  const sendImageToBackend = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", acceptedFiles[0]);
      setAcceptedFiles([]);

      const response = await fetch(
        `http://localhost:3000/analyzeimage/web/${idBed}`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setIsLoaded(false);
      }
    } catch (error) {}
  };
  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      const filtered = imagesAnalized.filter(
        (imageA) =>
          imageA.detected.plagues.join(", ").toLowerCase().includes(value) || // Busca en las plagas detectadas
          imageA.detected.diseases.join(", ").toLowerCase().includes(value) // Busca en las enfermedades detectadas
      );
      setFilteredImagesA(filtered);
    } else {
      setFilteredImagesA(imagesAnalized);
    }
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-imagesA-admin">
        <div className="content-container">
          <div className="table-container">
            <h1 className="h2green-bed-imageA">
              Invernadero{" "}
              <span className="name-bed">
                {" "}
                {nameGreenhouse}, Cama {numberBed}
              </span>
            </h1>
            <h4 className="h4farmer-bed-imageA">
              Agricultor responsable:{" "}
              <span className="name-farmer">{nameFarmer}</span>
            </h4>
            <div className="only-table-imageA">
              <div className="title-and-search-imageA">
                <div>
                  <h3>Imágenes analizadas</h3>
                  <label className="description-imagesA">
                    Lista de imágenes analizadas que tiene la cama seleccionada
                  </label>
                </div>
                <div className="header-table-imagesA">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="icon-ImageA"
                    size="lg"
                  />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={inputValue}
                    onChange={handleFilter}
                    className="search-ImageA"
                  />
                </div>
              </div>
              <DataTable
                columns={columns}
                data={filteredImagesA}
                responsive={true}
                fixedHeader
                pagination
                paginationComponentOptions={paginacionOpciones}
                noDataComponent={
                  <div className="no-beds-message">
                    Aún no hay imágenes analizadas
                  </div>
                }
              />
            </div>
          </div>
          <div className="image-uploader-container">
            <div className="image-uploader"
              {...getRootProps({ onClick: (event) => event.stopPropagation() })}
              style={{
                height: '250px',
                width: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <h3>Analiza una imagen</h3>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta la imagen aquí...</p>
              ) : (
                <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar</p>
              )}
              {acceptedFiles[0] && (
                <img
                  src={URL.createObjectURL(acceptedFiles[0])}
                  alt=""
                  style={{
                    marginTop: '20px',
                    maxWidth: '60%',
                    maxHeight: '200px',
                    background: "#dd585a2c"
                  }}
                />
              )}
            </div>
          </div>
        </div>
    </div>
  );
  
};

export default DTableImagesA;
