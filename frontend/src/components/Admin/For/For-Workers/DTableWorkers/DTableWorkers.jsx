import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './DTableWorkers.css'; 
import RegisterWorker from '../CRUD/Register/RegisterWorker';
import EditWorker from '../CRUD/Edit/EditWorker';
import DeleteWorker from '../CRUD/Delete/DeleteWorker';

/*Trabajadores*/

const DTableWorkers = () => {
    
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Primer apellido',
            selector: row => row.primerApellido,
            sortable: true
        },
        {
            name: 'Segundo apellido',
            selector: row => row.segundoApellido,
            sortable: true
        },
        {
            name: 'Invernadero',
            selector: row => row.invernadero,
            sortable: true
        },
        {
            name: 'Invernadero',
            selector: row => row.invernadero,
            sortable: true
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono
        },
        {
            name: 'Correo electrónico',
            selector: row => row.correo
        },
        {
            name: 'Usuario',
            selector: row => row.usuario,
            sortable: true
        },
        {
            name: 'Contraseña',
            selector: row => '********'
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='icons-container'>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEditClick(row)} className='edit-icon' size='lg'/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(row)} className='delete-icon' size='lg' />
                </div>
            )
        }
    ];

    const data = [
        {
            id: 1,
            nombre: 'lizeth',
            primerApellido: 'Antonio',
            segundoApellido: 'López',
            invernadero: 'listar',
            telefono: '9512488426',
            correo: 'lizeth2_intel@gmail.com',
            usuario: 'zeti',
            contrasenia: '123',
        }
    ];

    const [records, setRecords] = useState(data);
    const [showRegisterWorker, setshowRegisterWorker] = useState(false); //Form de register
    const [showEditWorker, setshowEditWorker] = useState(false); //Form de edicion
    const [showDeleteWorker, setshowDeleteWorker] = useState(false); //Form de eliminacion
    
    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    };

    const handleRegisterClick = () => {
        setshowRegisterWorker(true);
      };
      
      const handleCancelClick = () => {
        setshowRegisterWorker(false);
        setshowEditWorker(false);
        setshowDeleteWorker(false);
      };


      const handleEditClick = (row) => {
        setshowEditWorker(true);
      };

      const handleDeleteClick = (row) => {
        setshowDeleteWorker(true);
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
            data={records}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
                <div className='header-table-worker'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' onChange={handleFilter} className='searchWorker' />
                <button type="button" className='buttonTrabajador' onClick={handleRegisterClick}>Registrar agricultor</button>
              </div>
            }
          />
          {showRegisterWorker && <RegisterWorker onCancelClick={handleCancelClick} />} {}
          {showEditWorker && <EditWorker onCancelClick={handleCancelClick} />}
          {showDeleteWorker && <DeleteWorker onCancelClick={handleCancelClick} />}
          
        </div>
    );
    
};

export default DTableWorkers;
