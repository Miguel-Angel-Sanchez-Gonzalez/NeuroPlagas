import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './DTableGreenhouses.css'; 
import RegisterGreenhouse from '../CRUD/Register/RegisterGreenhouse';
import EditGreenhouse from '../CRUD/Edit/EditGreenhouse';
import DeleteGreenhouse from '../CRUD/Delete/DeleteGreenhouse';

const DTableGreenhouses = () => {
    const [inputValue, setInputValue] = useState("");
    const [filteredGreenhouses, setFilteredGreenhouses] = useState([]);

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_invernadero,
            sortable: true,
            width:'65px'
        },
        {
            name: 'Nombre del invernadero',
            selector: row => row.nombre,
            sortable: true,
            width:'240px',
        },
        {
            name: 'Tipo de invernadero',
            selector: row => row.tipo_invernadero,
            sortable: true,
            width:'160px',
        },
        {
            name: 'Humedad',
            selector: row => row.humedad,
            sortable: true,
            width:'110px',
        },
        {
            name: 'Tamaño',
            selector: row => row.tamanio,
            sortable: true,
            width:'110px',
        },
        {
            name: 'Agricultor responsable',
            selector: row => row.nombre_agricultor,
            width:'230px',
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='icons-container'>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEditClick(row)} className='edit-icon' size='lg'/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(row)} className='delete-icon' size='lg' />
                    <FontAwesomeIcon icon={faEye}  className='view-icon' size='lg' />
                </div>
            ),
            width:'100px'
        }
    ];

    const data = [
    ];

    const [showRegisterGreenh, setshowRegisterGreenh] = useState(false); //Form de register
    const [showEditGreenh, setshowEditGreenh] = useState(false); //Form de edicion
    const [showDeleteGreenh, setshowDeleteGreenh] = useState(false); //Form de eliminacion
    const [greenhouses, setGreenhouses] = useState(data);

    useEffect(()=>{
        getGreenhouses();
    },[])

    /*FUNCIONES*/
    async function getGreenhouses(){
        const response = await fetch(`http://localhost:3000/greenhouse/`)
        const data = await response.json()
        //se están cargando los datos
        setGreenhouses(data);
        setFilteredGreenhouses(data);
    } 

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        if (value) {
            //dividir el texto para separar los valores de búsqueda
            const searchValue = value.split(' ');
            const filtered = greenhouses.filter(greenhouse =>{
                return searchValue.every(value =>
                    greenhouse.nombre.toLowerCase().includes(value) ||
                    greenhouse.nombre_agricultor.toLowerCase().includes(value) 
                )}
            );
            //muestra los agricultores filtrados
            setFilteredGreenhouses(filtered);
        } else {
            setFilteredGreenhouses(greenhouses); 
        }
    };

    const handleRegisterClick = () => {
        setshowRegisterGreenh(true);
      };
      
    const handleCancelClick = () => {
        setshowRegisterGreenh(false);
        setshowEditGreenh(false);
        setshowDeleteGreenh(false);
      };

    const handleEditClick = (row) => {
        setshowEditGreenh(true);
      };

    const handleDeleteClick = (row) => {
        setshowDeleteGreenh(true);
    };

    const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-greenhouse-admin'>
          <DataTable 
            title={<div>Invernaderos<label className='description-greenhouse'>Lista de todos los invernaderos que existen en el sistema</label></div>}
            columns={columns}
            //Considerando el filtro
            data={filteredGreenhouses}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
            <div className='header-table-greenhouse'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' value={inputValue} onChange={handleFilter} className='searchDisease'/>
                <button type="button" className='buttonInvernadero'onClick={handleRegisterClick}>Registrar invernadero</button>
            </div>
            }
          />
          {showRegisterGreenh && <RegisterGreenhouse onCancelClick={handleCancelClick} />}{}
          {showEditGreenh && <EditGreenhouse onCancelClick={handleCancelClick} />}
          {showDeleteGreenh && <DeleteGreenhouse onCancelClick={handleCancelClick} />}
          
        </div>
    );
};

export default DTableGreenhouses;
