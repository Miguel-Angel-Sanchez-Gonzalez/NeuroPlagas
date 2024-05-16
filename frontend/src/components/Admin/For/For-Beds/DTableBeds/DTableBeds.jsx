import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash, faEye, faBackward, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './DTableBeds.css'; 
import DTableGreenhouses from '../../For-Greenhouses/DTableGreenhouses/DTableGreenhouses';
import RegisterBed from '../CRUD/Register/RegisterBed';
import EditBed from '../CRUD/Edit/EditBed';
import DTableImagesA from '../../For-ImagesAnalized/DTableImagesAnalized/DTableImagesA';

const DTableBeds = ({idGreenhouse, nameGreenhouse, nameFarmer}) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredBeds, setFilteredBeds] = useState([]);
    const [idBed, setIDBed] = useState("");
    // const [nameGreenhouse, setNameGreenhouse] = useState("");
    const [numberBed, setNumberBed] = useState("");

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_cama,
            sortable: true,
            width:'65px'
        },
        {
            name: 'Número de cama',
            selector: row => row.numero_cama,
            sortable: true,
            width:'260px',
        },
        {
            name: 'Tipo de cultivo',
            selector: row => row.tipo_cultivo,
            sortable: true,
            width:'350px',
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='icons-container'>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEditClick(row)} className='edit-icon' size='lg'/>
                    {/* <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(row)} className='delete-icon' size='lg' /> */}
                    <FontAwesomeIcon icon={faEye}   onClick={() => handdleShowbednalized(row)} className='view-icon' size='lg' />
                </div>
            ),
            width:'auto'
        }
    ];

    const data = [
    ];
    
    const [showRegisterBed, setshowRegisterBed] = useState(false); //Form de register
    const [showEditBed, setshowEditBed] = useState(false); //Form de edicion
    const [showDeleteBed, setshowDeleteBed] = useState(false); //Form de eliminacion
    const [showDataTableGreenhouse, setshowDataTableGreenhouse] = useState(false); //Form para ver las camas de un invernadero
    const [showDataTableImagesA, setshowDataTableImagesA] = useState(false); //Form para ver las imagenes de una cama
    const [beds, setBeds] = useState(data);

    useEffect(() => {
        console.log(idGreenhouse)
        getBedByIdGreenhouse();
    
    }, [idGreenhouse]);

  
    const getBedByIdGreenhouse = async () => {
    try {
        const response = await fetch(`http://localhost:3000/bed/greenhouse/${idGreenhouse}`);
        const data = await response.json();
        setBeds(data);
        setFilteredBeds(data);
      } catch (error) {
        console.error('Error al obtener las camas:', error);
      }
    }

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        if (value) {
            //dividir el texto para separar los valores de búsqueda
            const searchValue = value.split(' ');
            const filtered = beds.filter(bed =>{
                return searchValue.every(value =>
                    bed.tipo_cultivo.toLowerCase().includes(value) 
                )}
            );
            //muestra los agricultores filtrados
            setFilteredBeds(filtered);
        } else {
            setFilteredBeds(beds); 
        }
    };

    const handleRegisterClick = () => {
        setshowRegisterBed(true);
        //setIDBed(row.id_invernadero);
      };
      
    const handleCancelClick = () => {
        setshowRegisterBed(false);
        setshowEditBed(false);
        setshowDeleteBed(false);
        setshowDataTableGreenhouse(false);
        setshowDataTableImagesA(false);
      };

      //Para regresar a la vista de todos los invernaderos DTableGreenhouse
    const handleBackGreenClick = () => {
        setshowDataTableGreenhouse(true);
      };


    //Para editar una cama en especifo
    const handleEditClick = (row) => {
        setIDBed(row.id_cama);
        setshowEditBed(true);
      };

    // const handleDeleteClick = (row) => {
    //     setIDBed(row.id_cama);
    //     setshowDeleteBed(true);
    // };

    //Para mostrar las imagenes
    const handdleShowbednalized = (row) => {
        setIDBed(row.id_cama);
        setNumberBed(row.numero_cama)
        setshowDataTableImagesA(true);
    };

    //si setshowDataTableGreenhouse d es true se muestra el DTableBeds
    if (showDataTableGreenhouse) {
        console.log("Volviste a la vista invernadero" + showDataTableGreenhouse)
        return <DTableGreenhouses onCancelClick={handleCancelClick} />
    }

    //si setshowDataTableImagesA es true se muestra las imágenes analizadas
    if (showDataTableImagesA) {
        return <DTableImagesA onCancelClick={handleCancelClick} idGreenhouse={idGreenhouse} nameGreenhouse={nameGreenhouse} nameFarmer={nameFarmer} idBed={idBed} numberBed={numberBed}/>
    }

    const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-bed-admin'>
            <div className='left-content-bed'>
            <FontAwesomeIcon icon={faArrowCircleLeft} className='back-icon' onClick={handleBackGreenClick} size='2x' />
            </div>
            <div className='right-content-bed'>
                <h1 className='h2green-bed'>Invernadero <span className='name-bed'> {nameGreenhouse}</span></h1>
                <h4 className='h4farmer-bed'>Agricultor responsable: <span className='name-farmer'>{nameFarmer}</span></h4>
                <div className='only-table-bed'>
                    <div className="title-and-search-bed">
                        <div>
                            <h3>Camas</h3>
                            <label className='description-bed'>Lista de imágenes analizadas que tiene la cama seleccionada</label>
                        </div>
                        <div className='header-table-bed'>
                            <FontAwesomeIcon icon={faSearch} className='icon-bed' size='lg'/>
                            <input type="text" placeholder='Buscar...' value={inputValue} onChange={handleFilter} className='search-bed'/>
                            <button type="button" className='buttonBed' onClick={handleRegisterClick}>Registrar cama</button>
                        </div>
                    </div>
                    <DataTable 
                        columns={columns}
                        //Considerando el filtro
                        data={filteredBeds}
                        responsive={true}
                        selectableRows
                        fixedHeader
                        pagination
                        paginationComponentOptions={paginacionOpciones}
                    />
                    </div>
          </div>
          {showRegisterBed && <RegisterBed onCancelClick={handleRegisterClick} idGreenhouse={idGreenhouse} />}
          {showEditBed && <EditBed onCancelClick={handleCancelClick} idBed={idBed} idGreenhouse={idGreenhouse}/>}
          {showDataTableImagesA && <DTableImagesA onCancelClick={handleCancelClick} idBed={idBed} idGreenhouse={idGreenhouse} />} 
          
        </div>
    );
};

export default DTableBeds;
