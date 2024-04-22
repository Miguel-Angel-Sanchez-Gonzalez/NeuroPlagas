import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './DTableGreenhouses.css'; 
import RegisterGreenhouse from '../CRUD/Register/RegisterGreenhouse';
import EditGreenhouse from '../CRUD/Edit/EditGreenhouse';
import DeleteGreenhouse from '../CRUD/Delete/DeleteGreenhouse';

const DTableGreenhouses = () => {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Nombre del invernadero',
            selector: row => row.nombreInvernadero,
            sortable: true
        },
        {
            name: 'Tipo de invernadero',
            selector: row => row.tipoInvernadero,
            sortable: true
        },
        {
            name: 'Humedad',
            selector: row => row.humedad,
            sortable: true
        },
        {
            name: 'Tamaño',
            selector: row => row.tamamnio,
            sortable: true
        },
        {
            name: 'Agricultor responsable',
            selector: row => row.agricultorResponsable
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='icons-container'>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEditClick(row)} className='edit-icon' size='lg'/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(row)} className='delete-icon' size='lg' />
                    <FontAwesomeIcon icon={faEye}  className='view-icon' size='lg' />
                </div>
            )
        }
    ];

    const data = [
        {
            id: 1,
            nombreInvernadero: 'Los tomates nuevos',
            tipoInvernadero: 'casa',
            humedad: '34',
            tamanio: '200mts',
            agricultorResponsable: 'Mario Ortiz'
        }
    ];

    const [records, setRecords] = useState(data);
    const [showRegisterGreenh, setshowRegisterGreenh] = useState(false); //Form de register
    const [showEditGreenh, setshowEditGreenh] = useState(false); //Form de edicion
    const [showDeleteGreenh, setshowDeleteGreenh] = useState(false); //Form de eliminacion

    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
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
            data={records}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
            <div className='header-table-greenhouse'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' onChange={handleFilter} />
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
