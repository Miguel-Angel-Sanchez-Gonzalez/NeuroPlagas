import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './DTableWorkers.css'; 
import RegisterWorker from '../CRUD/Register/RegisterWorker';
import EditWorker from '../CRUD/Edit/EditWorker';
import DeleteWorker from '../CRUD/Delete/DeleteWorker';

/*Trabajadores*/

const DTableWorkers = () => {
    const [inputValue, setInputValue] = useState("");
    const [filteredWorkers, setFilteredWorkers] = useState([]); 
    const [idWorker, setIDWorker] = useState("");
    
    const columns = [
        {
            name: 'ID',
            selector: row => row.id_trabajador,
            sortable: true,
            width:'65px'
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
            width:'100px',
        },
        {
            name: 'Primer apellido',
            selector: row => row.primer_apellido,
            sortable: true,
            width:'160px'
        },
        {
            name: 'Segundo apellido',
            selector: row => row.segundo_apellido,
            sortable: true,
            width:'160px'
        },
        {
            name: 'Invernadero',
            selector: row => row.id_invernadero,
            width:'140px'
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono,
            width:'140px'
        },
        {
            name: 'Correo electrónico',
            selector: row => row.correo_electronico,
            width:'220px'
        },
        {
            name: 'Usuario',
            selector: row => row.nombre_usuario,
            sortable: true,
            width:'100px'
        },
        {
            name: 'Contraseña',
            selector: row => '********',
            width:'110px'
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='icons-container'>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEditClick(row)} className='edit-icon' size='lg'/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(row)} className='delete-icon' size='lg' />
                </div>
            ),
            width:'90px'
        }
    ];

    const data = [];

    const [showRegisterWorker, setShowRegisterWorker] = useState(false); //Form de register
    const [showEditWorker, setShowEditWorker] = useState(false); //Form de edicion
    const [showDeleteWorker, setShowDeleteWorker] = useState(false); //Form de eliminacion
    const [workers, setWorkers] = useState(data);
    
    useEffect(()=>{
        getWorkers();
    },[])

    /*FUNCIONES*/
    async function getWorkers(){
        const response = await fetch(`http://localhost:3000/worker/`)
        const data = await response.json()
        //se están cargando los datos
        setWorkers(data);
        setFilteredWorkers(data);
        
    } 
    
    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        if (value) {
            //dividir el texto para separar los valores de búsqueda
            const searchValue = value.split(' ');
            const filtered = workers.filter(worker =>{
                return searchValue.every(value =>
                    worker.nombre.toLowerCase().includes(value) ||
                    worker.primer_apellido.toLowerCase().includes(value) ||
                    worker.segundo_apellido.toLowerCase().includes(value)
                )}
            );
            
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
        console.log("ID del registro a actualizar:", row.id_agricultor);
        setShowEditWorker(true);
      };

      const handleDeleteClick = (row) => {
        console.log("ID del registro a eliminar:", row.id_agricultor);
        setShowDeleteWorker(true);
        setIDWorker(row.id_agricultor);
      };

      const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-worker-admin'>
          <DataTable 
            title={<div>Trabajadores<label className='description-worker'>Lista de todos los trabajadores que existen en el sistema</label></div>}
            columns={columns}
            //se está considerando el filtro
            data={filteredWorkers}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
                <div className='header-table-worker'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' value={inputValue} onChange={handleFilter} className='searchWorker' />
                <button type="button" className='buttonTrabajador' onClick={handleRegisterClick}>Registrar agricultor</button>
              </div>
            }
          />
          {showRegisterWorker && <RegisterWorker onCancelClick={handleCancelClick} />} {}
          {showEditWorker && <EditWorker onCancelClick={handleCancelClick} />}
          {showDeleteWorker && <DeleteWorker onCancelClick={handleCancelClick} idWorker={idWorker}/>}
          
        </div>
    );
    
};

export default DTableWorkers;
