import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './DTableDiseases.css'; 
import RegisterDisease from '../CRUD/Register/RegisterDisease';
import EditDisease from '../CRUD/Edit/EditDisease';
import DeleteDisease from '../CRUD/Delete/DeleteDisease';

/*Enfermedad*/

const DTableDiseases = () => {

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_enfermedad,
            sortable: true,
            width:'65px',
            
        },
        {
            name: 'Nombre de la enfermedad',
            selector: row => row.nombre,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Nombre científico',
            selector: row => row.nombre_cientifico,
            sortable: true
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion,
            sortable: true,
            width:'300px'
        },
        {
            name: 'Recomendaciones',
            selector: row => row.recomendaciones,
            sortable: true,
            width:'300px'
        },
        {
            name: 'Acciones a tomar',
            selector: row => row.acciones,
            width:'300px'
            
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
            nombreEnfermedad: 'Botritys',
            nombreCientifico: 'Botritys cinerea',
            descripcion: 'Enfermedad mala',
            recomendaciones: 'Mantener humedo el invernadero',
            acciones: 'Retirar maleza',
        }
    ];
    
    // const [records, setRecords] = useState(data);
    const [showRegisterDisease, setShowRegisterDisease] = useState(false); //Form de register
    const [showEditDisease, setShowEditDisease] = useState(false); //Form de edicion
    const [showDeleteDisease, setShowDeleteDisease] = useState(false); //Form de eliminacion
    const [diseases,setDiseases] = useState([])
    
    useEffect(()=>{
        getDiseases();
    },[])

    /*FUNCIONES*/
    async function getDiseases(){
        const response = await fetch(`http://localhost:3000/disease`)
        const data = await response.json()
        setDiseases(data);
        console.log(diseases)
    } 


    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        });
    };

    const handleRegisterClick = () => {
        setShowRegisterDisease(true);
      };
      
      const handleCancelClick = () => {
        setShowRegisterDisease(false);
        setShowEditDisease(false);
        setShowDeleteDisease(false);
      };


      const handleEditClick = (row) => {
        setShowEditDisease(true);
      };

      const handleDeleteClick = (row) => {
        setShowDeleteDisease(true);
      };

      const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-disease-admin'>
          <DataTable 
            title={<div>Enfermedades<label className='description'>Lista de enfermedades en los invernaderos</label></div>}
            columns={columns}
            data={diseases}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
                <div className='header-table-disease'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' onChange={handleFilter} />
                <button type="button" className='buttonEnfermedad' onClick={handleRegisterClick}>Registrar enfermedad</button>
              </div>
            }
          />
          {showRegisterDisease && <RegisterDisease onCancelClick={handleCancelClick} />} {}
          {showEditDisease && <EditDisease onCancelClick={handleCancelClick} />}
          {showDeleteDisease && <DeleteDisease onCancelClick={handleCancelClick} />}
          
        </div>
    );
    
};

export default DTableDiseases;
