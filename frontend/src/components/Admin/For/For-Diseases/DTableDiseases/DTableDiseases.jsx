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
    const [inputValue, setInputValue] = useState("");
    const [filteredDiseases, setFilteredDiseases] = useState([]); 
    const [idDisease, setIDDisease] = useState(""); 

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
            ),
            width:'90px'
        }
    ];

    const data = [
    ];
    
    const [showRegisterDisease, setShowRegisterDisease] = useState(false); //Form de register
    const [showEditDisease, setShowEditDisease] = useState(false); //Form de edicion
    const [showDeleteDisease, setShowDeleteDisease] = useState(false); //Form de eliminacion
    const [diseases,setDiseases] = useState(data)

    
    useEffect(()=>{
        getDiseases();
    },[])

    /*FUNCIONES*/
    async function getDiseases(){
    try{
        const response = await fetch(`http://localhost:3000/disease`)
        if (response.status === 200) {
            const data = await response.json();
            setDiseases(data);
            setFilteredDiseases(data);
        } else {
            throw new Error('Error al obtener las enfermedades');
          }
        } catch (error) {
          console.error("Error al cargar los datos de las enfermedades:", error);
          alert('Error al obtener las enfermedades, inténtelo más tarte:')
        }
    } 


    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        if (value) {
            //dividir el texto para separar los valores de búsqueda
            const searchValue = value.split(' ');
            const filtered = diseases.filter(disease =>{
                return searchValue.every(value =>
                    disease.nombre.toLowerCase().includes(value) ||
                    disease.nombre_cientifico.toLowerCase().includes(value) 
                )}
            );
            //muestrlas enfermedades filtrados
            setFilteredDiseases(filtered);
        } else {
            setFilteredDiseases(diseases); 
        }
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
        setIDDisease(row.id_enfermedad);
      };

      const handleDeleteClick = (row) => {
        setShowDeleteDisease(true);
        setIDDisease(row.id_enfermedad);
      };

      const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-disease-admin'>
          <DataTable className="custom-table-disease"
            title={<div><h4>Enfermedades</h4><label className='description'>Lista de enfermedades en los invernaderos</label></div>}
            columns={columns}
            //considerando el filtro
            data={filteredDiseases}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
                <div className='header-table-disease'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' value={inputValue} onChange={handleFilter} className='searchDisease'/>
                <button type="button" className='buttonEnfermedad' onClick={handleRegisterClick}>Registrar enfermedad</button>
              </div>
            } noDataComponent={
                <div className="no-beds-message">
                  Aún no hay enfermedades registradas
                </div>
              }
          />
          {showRegisterDisease && <RegisterDisease onCancelClick={handleCancelClick} />} {}
          {showEditDisease && <EditDisease onCancelClick={handleCancelClick} idDisease={idDisease} />}
          {showDeleteDisease && <DeleteDisease onCancelClick={handleCancelClick} idDisease={idDisease} />}
          
        </div>
    );
    
};

export default DTableDiseases;