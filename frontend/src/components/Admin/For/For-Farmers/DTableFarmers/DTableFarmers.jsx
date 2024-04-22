import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './DTableFarmers.css'; 
import RegisterFarmer from '../CRUD/Register/RegisterFarmer';
import EditFarmer from '../CRUD/Edit/EditFarmer';
import DeleteFarmer from '../CRUD/Delete/DeleteFarmer';

/*AGricultores*/

const DTableFarmers = () => {
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
            telefono: '9512488426',
            correo: 'lizeth2_intel@gmail.com',
            usuario: 'zeti',
            contrasenia: '123',
        }
    ];

    const [records, setRecords] = useState(data);
    const [showRegisterFarmer, setShowRegisterFarmer] = useState(false); //Form de register
    const [showEditFarmer, setShowEditFarmer] = useState(false); //Form de edicion
    const [showDeleteFarmer, setshowDeleteFarmer] = useState(false); //Form de eliminacion
    
    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    };

    const handleRegisterClick = () => {
        setShowRegisterFarmer(true);
      };
      
      const handleCancelClick = () => {
        setShowRegisterFarmer(false);
        setShowEditFarmer(false);
        setshowDeleteFarmer(false);
      };


      const handleEditClick = (row) => {
        setShowEditFarmer(true);
      };

      const handleDeleteClick = (row) => {
        setshowDeleteFarmer(true);
      };

      const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-farmer-admin'>
          <DataTable 
            title={<div>Agricultores<label className='description-farmer'>Lista de todos los agricultores que existen en el sistema</label></div>}
            columns={columns}
            data={records}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
                <div className='header-table-farmer'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' onChange={handleFilter} />
                <button type="button" className='buttonAgricultor' onClick={handleRegisterClick}>Registrar agricultor</button>
              </div>
            }
          />
          {showRegisterFarmer && <RegisterFarmer onCancelClick={handleCancelClick} />} {}
          {showEditFarmer && <EditFarmer onCancelClick={handleCancelClick} />}
          {showDeleteFarmer && <DeleteFarmer onCancelClick={handleCancelClick} />}
          
        </div>
    );
    
};

export default DTableFarmers;
