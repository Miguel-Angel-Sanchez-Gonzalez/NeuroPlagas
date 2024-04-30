import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './DTableFarmers.css'; 
import RegisterFarmer from '../CRUD/Register/RegisterFarmer';
import EditFarmer from '../CRUD/Edit/EditFarmer';
import DeleteFarmer from '../CRUD/Delete/DeleteFarmer';

/*Agricultores*/

const DTableFarmers = () => {
    const [inputValue, setInputValue] = useState("");
    const [filteredFarmers, setFilteredFarmers] = useState([]); 

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_agricultor,
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
            width:'140px'
        },
        {
            name: 'Segundo apellido',
            selector: row => row.segundo_apellido,
            sortable: true,
            width:'150px'
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono,
            width:'110px'
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
            width:'95px'
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
        //se están cargando los datos
        setFarmers(data);
        setFilteredFarmers(data);
        console.log(farmers)
    } 
    
    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        if (value) {
            //dividir el texto para separar los valores de búsqueda
            const searchValue = value.split(' ');
            const filtered = farmers.filter(farmer =>{
                return searchValue.every(value =>
                    farmer.nombre.toLowerCase().includes(value) ||
                    farmer.primer_apellido.toLowerCase().includes(value) ||
                    farmer.segundo_apellido.toLowerCase().includes(value)
                )}
            );
            //muestra los agricultores filtrados
            setFilteredFarmers(filtered);
        } else {
            setFilteredFarmers(farmers); 
        }
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
            //se está considerando el filtro
            data={filteredFarmers}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
                <div className='header-table-farmer'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' value={inputValue} onChange={handleFilter} className='searchFarmer' />
                <button type="button" className='buttonAgricultor' onClick={handleRegisterClick}>Registrar agricultor</button>
              </div>
            }
          />
          {showRegisterFarmer && <RegisterFarmer onCancelClick={handleCancelClick} />} 
          {showEditFarmer && <EditFarmer onCancelClick={handleCancelClick} />}
          {showDeleteFarmer && <DeleteFarmer onCancelClick={handleCancelClick} />}
          
        </div>
    );
    
};

export default DTableFarmers;