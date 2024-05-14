import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './DTableBeds.css'; 
import RegisterBed from '../CRUD/Register/RegisterBed';
import DTableGreenhouses from '../../For-Greenhouses/DTableGreenhouses/DTableGreenhouses';
// import RegisterGreenhouse from '../CRUD/Register/RegisterGreenhouse';
// import EditGreenhouse from '../CRUD/Edit/EditGreenhouse';
// import DeleteGreenhouse from '../CRUD/Delete/DeleteGreenhouse';

const DTableBeds = ({idGreenhouse, nameGreenhouse, nameFarmer}) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredBeds, setFilteredBeds] = useState([]);
    const [showGreenhouse, setShowGreenhouse] = useState(false); //Form para ver las camas de un invernadero

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_cama,
            sortable: true,
            width:'65px'
        },
        {
            name: 'Número de cama',
            selector: row => row.numero_cama,
            sortable: true,
            width:'260px',
        },
        {
            name: 'Tipo de cultivo',
            selector: row => row.tipo_cultivo,
            sortable: true,
            width:'350px',
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='icons-container'>
                    <FontAwesomeIcon icon={faPencilAlt}  className='edit-icon' size='lg'/>
                    <FontAwesomeIcon icon={faTrash} className='delete-icon' size='lg' />
                    <FontAwesomeIcon icon={faEye}  className='view-icon' size='lg' />
                </div>
            ),
            width:'auto'
        }
    ];

    const data = [
    ];
    
    const [showRegisterBed, setshowRegisterBed] = useState(false); //Form de register
    const [showEditBed, setshowEditBed] = useState(false); //Form de edicion
    const [showDeleteBed, setshowDeleteBed] = useState(false); //Form de eliminacion
    const [beds, setBeds] = useState(data);

    // useEffect(()=>{
    //     getBeds();
    // },[])

    // /*FUNCIONES*/
    // async function getBeds(){
    //     `http://localhost:3000/farmer/${}`
    //     const response = await fetch(`http://localhost:3000/greenhouse/`)
    //     const data = await response.json()
    //     //se están cargando los datos
        
    // } 

    useEffect(() => {
        console.log(idGreenhouse)
        getBedByIdGreenhouse();
    
    }, [idGreenhouse]);

  
    const getBedByIdGreenhouse = async () => {
    try {
        const response = await fetch(`http://localhost:3000/bed/greenhouse/${idGreenhouse}`);
        const data = await response.json();
        setBeds(data);
        setFilteredBeds(data);
      } catch (error) {
        console.error('Error al obtener las camas:', error);
      }
    }

    // const getGreenhouseDetails = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:3000/greenhouse/${idGreenhouse}`);
    //       const greenhouseData = await response.json();
    //       //setGreenhouseName(greenhouseData.nombre); // Asumiendo que 'nombre' es la propiedad que contiene el nombre del invernadero
    //     } catch (error) {
    //       console.error('Error al obtener los datos del invernadero:', error);
    //     }
    //   };
    


    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        if (value) {
            //dividir el texto para separar los valores de búsqueda
            const searchValue = value.split(' ');
            const filtered = beds.filter(bed =>{
                return searchValue.every(value =>
                    bed.tipo_cultivo.toLowerCase().includes(value) 
                )}
            );
            //muestra los agricultores filtrados
            setFilteredBeds(filtered);
        } else {
            setFilteredBeds(beds); 
        }
    };

    const handleRegisterClick = () => {
        setshowRegisterBed(true);
        //setIDGreenhouse(row.id_invernadero);
      };
      
    const handleCancelClick = () => {
        setshowRegisterBed(false);
        setshowEditBed(false);
        setshowDeleteBed(false);
        setShowGreenhouse(false);
      };

    const handleBackGreenClick = () => {
        setShowGreenhouse(true);
      };

    //   const handdleShowBeds = (row) => {
    //     setIDGreenhouse(row.id_invernadero);
    //     setNameGreenhouse(row.nombre);
    //     setNameFarmer(row.nombre_agricultor);
        
    // };

    // const handleEditClick = (row) => {
    //     setIDGreenhouse(row.id_cama);
    //     setshowEditBed(true);
    //   };

    // const handleDeleteClick = (row) => {
    //     setIDGreenhouse(row.id_cama);
    //     setshowDeleteBed(true);
    // };

    //si showGreenhouseBeds es true se muestra el DTableBeds
    if (showGreenhouse) {
        return <DTableGreenhouses onCancelClick={handleCancelClick} />
    }

    const paginacionOpciones={
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className='table-greenBed-admin'>
            <h1 className='h2bed'> Invernadero <span className='name-bed'> {nameGreenhouse}</span></h1>
            <h4 className='h4farmer-bed'> Agricultor responsable: <span className='name-farmer'> {nameFarmer}</span></h4>
          <DataTable 
            title={<div> <h4>Camas</h4><label className='description-greenBed'>Lista de camas que tiene el invernadero</label></div>}
            columns={columns}
            //Considerando el filtro
            data={filteredBeds}
            responsive={true}
            selectableRows
            fixedHeader
            pagination
            paginationComponentOptions={paginacionOpciones}
            actions={
            <div className='header-table-greenBed'>
                <FontAwesomeIcon icon={faSearch} className='search' />
                <input type="text" placeholder='Buscar...' value={inputValue} onChange={handleFilter} className='searchgreenBed'/>
                <button type="button" className='buttonBed' onClick={handleRegisterClick}>Registrar cama</button>
            </div>
            }
          />
          {showRegisterBed && <RegisterBed onCancelClick={handleRegisterClick} idGreenhouse={idGreenhouse} />}{}
          {/*showEditBed && <EditGreenhouse onCancelClick={handleCancelClick} idGreenhouse={idGreenhouse}/>}
          {showDeleteBed && <DeleteGreenhouse onCancelClick={handleCancelClick} idGreenhouse={idGreenhouse} />} */}
          <button type="button" className='button-Backgreen' onClick={handleBackGreenClick}> Regresar a invernaderos</button>
        </div>
    );
};

export default DTableBeds;
