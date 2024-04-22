import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './DTablePlagues.css'; 
import RegisterPlague from '../CRUD/Register/RegisterPlague';
import EditPlague from '../CRUD/Edit/EditPlague';
import DeletePlague from '../CRUD/Delete/DeletePlague';
/*Plagas*/

const DTablePlagues = () => {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Nombre de la plaga',
            selector: row => row.nombrePlaga,
            sortable: true
        },
        {
            name: 'Nombre científico',
            selector: row => row.nombreCientifico,
            sortable: true
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion,
            sortable: true
        },
        {
            name: 'Recomendaciones',
            selector: row => row.recomendaciones,
            sortable: true
        },
        {
            name: 'Acciones a tomar',
            selector: row => row.acciones
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
            nombrePlaga: 'Araña roja',
            nombreCientifico: 'Tetranychus urticae',
            descripcion: 'Plaga mala',
            recomendaciones: 'Mantener fresco el invernadero',
            acciones: 'Retirar maleza',
        }
    ];

    const [records, setRecords] = useState(data);
    const [showRegisterPlague, setShowRegisterPlague] = useState(false); //Form de register
    const [showEditPlague, setShowEditPlague] = useState(false); //Form de edicion
    const [showDeletePlague, setShowDeletePlague] = useState(false); //Form de eliminacion

    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    };

    const handleRegisterClick = () => {
        setShowRegisterPlague(true);
      };
      
      const handleCancelClick = () => {
        setShowRegisterPlague(false);
        setShowEditPlague(false);
        setShowDeletePlague(false);
      };


      const handleEditClick = (row) => {
        setShowEditPlague(true);
      };

      const handleDeleteClick = (row) => {
        setShowDeletePlague(true);
      };

      const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-plague-admin'>
          <DataTable 
            title={<div>Plagas<label className='description'>Lista de plagas en los invernaderos</label></div>}
            columns={columns}
            data={records}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
                <div className='header-table-plague'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' onChange={handleFilter} />
                <button type="button" className='buttonPlaga' onClick={handleRegisterClick}>Registrar plaga</button>
              </div>
            }
          />
          {showRegisterPlague && <RegisterPlague onCancelClick={handleCancelClick} />} {}
          {showEditPlague && <EditPlague onCancelClick={handleCancelClick} />}
          {showDeletePlague && <DeletePlague onCancelClick={handleCancelClick} />}
          
        </div>
    );
    
};

export default DTablePlagues;
