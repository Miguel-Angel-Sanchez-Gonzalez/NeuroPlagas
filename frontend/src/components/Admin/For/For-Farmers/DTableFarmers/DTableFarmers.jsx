import React, { useEffect, useState } from 'react';
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
            selector: row => row.id_agricultor,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Primer apellido',
            selector: row => row.primer_apellido,
            sortable: true
        },
        {
            name: 'Segundo apellido',
            selector: row => row.segundo_apellido,
            sortable: true
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono
        },
        {
            name: 'Correo electrónico',
            selector: row => row.correo_electronico
        },
        {
            name: 'Usuario',
            selector: row => row.nombre_usuario,
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
    ];

    const [showRegisterFarmer, setShowRegisterFarmer] = useState(false); //Form de register
    const [showEditFarmer, setShowEditFarmer] = useState(false); //Form de edicion
    const [showDeleteFarmer, setshowDeleteFarmer] = useState(false); //Form de eliminacion
    const [farmers, setFarmers] = useState(data);

    useEffect(()=>{
        getFarmers();
    },[])

    /*FUNCIONES*/
    async function getFarmers(){
        const response = await fetch(`http://localhost:3000/farmer/`)
        const data = await response.json()
        setFarmers(data);
        console.log(farmers)
    } 
    
    const handleFilter = (event) => {
        const newData = farmers.filter(row => {
            return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setFarmers(newData);
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
            data={farmers}
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
