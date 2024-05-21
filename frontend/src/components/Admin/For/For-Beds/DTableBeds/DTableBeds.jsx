import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './DTableBeds.css'; 
import RegisterBed from '../CRUD/Register/RegisterBed';
import EditBed from '../CRUD/Edit/EditBed';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DTableBeds = () => {
    const [inputValue, setInputValue] = useState("");
    const [filteredBeds, setFilteredBeds] = useState([]);
    const [idBed, setIDBed] = useState("");
    const [idGreenhouse, setIDGreenhouse] = useState("");
    const [nameGreenhouse, setNameGreenhouse] = useState("");
    const [nameFarmer, setNameFarmer] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const { idGreenhouse: paramIdGreenhouse } = useParams();

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_cama,
            sortable: true,
            width: '65px'
        },
        {
            name: 'Número de cama',
            selector: row => row.numero_cama,
            sortable: true,
            width: '260px',
        },
        {
            name: 'Tipo de cultivo',
            selector: row => row.tipo_cultivo,
            sortable: true,
            width: '350px',
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='icons-container'>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEditClick(row)} className='edit-icon' size='lg'/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(row)} className='delete-icon' size='lg' /> 
                    <FontAwesomeIcon icon={faEye} onClick={() => handleShowImageAnalized(row)} className='view-icon' size='lg' />
                </div>
            ),
            width: 'auto'
        }
    ];

    const [showRegisterBed, setShowRegisterBed] = useState(false);
    const [showEditBed, setShowEditBed] = useState(false);
    const [showDeleteBed, setShowDeleteBed] = useState(false);
    const [beds, setBeds] = useState([]);

    useEffect(() => {
        if (location.state) {
            const { idGreenhouse, nameGreenhouse, nameFarmer } = location.state;
            setIDGreenhouse(idGreenhouse);
            setNameGreenhouse(nameGreenhouse);
            setNameFarmer(nameFarmer);
            getBedByIdGreenhouse(idGreenhouse);
        } else if (paramIdGreenhouse) {
            setIDGreenhouse(paramIdGreenhouse);
            getBedByIdGreenhouse(paramIdGreenhouse);
        }
    }, [location.state, paramIdGreenhouse]);

    const getBedByIdGreenhouse = async (idGreenhouse) => {
        try {
            const response = await fetch(`http://localhost:3000/bed/greenhouse/${idGreenhouse}`);
            const data = await response.json();
            setBeds(data);
            setFilteredBeds(data);
        } catch (error) {
            console.error('Error al obtener las camas:', error);
        }
    };

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        if (value) {
            const searchValue = value.split(' ');
            const filtered = beds.filter(bed =>
                searchValue.every(val =>
                    bed.tipo_cultivo.toLowerCase().includes(val)
                )
            );
            setFilteredBeds(filtered);
        } else {
            setFilteredBeds(beds); 
        }
    };

    const handleRegisterClick = () => {
        setShowRegisterBed(true);
    };
      
    const handleCancelClick = () => {
        setShowRegisterBed(false);
        setShowEditBed(false);
        setShowDeleteBed(false);
    };

    const handleEditClick = (row) => {
        setIDBed(row.id_cama);
        setShowEditBed(true);
    };

    const handleDeleteClick = (row) => {
        setIDBed(row.id_cama);
        setShowDeleteBed(true);
    };

    const handleShowImageAnalized = (row) => {
        navigate(`/homeAdmin/invernaderos/${idGreenhouse}/imagenesAnalizadas/${row.id_cama}`, {
            state: {
                idGreenhouse,
                nameGreenhouse,
                nameFarmer,
                idBed: row.id_cama,
                numberBed: row.numero_cama
            }
        });
    };

    const paginacionOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    };

    return (
        <div className='table-bed-admin'>
            <div className='right-content-bed'>
                <h1 className='h2green-bed'>Invernadero <span className='name-bed'> {nameGreenhouse}</span></h1>
                <h4 className='h4farmer-bed'>Agricultor responsable: <span className='name-farmer'>{nameFarmer}</span></h4>
                <div className='only-table-bed'>
                    <div className="title-and-search-bed">
                        <div>
                            <h3>Camas</h3>
                            <label className='description-bed'>Lista de imágenes analizadas que tiene la cama seleccionada</label>
                        </div>
                        <div className='header-table-bed'>
                            <FontAwesomeIcon icon={faSearch} className='icon-bed' size='lg'/>
                            <input type="text" placeholder='Buscar...' value={inputValue} onChange={handleFilter} className='search-bed'/>
                            <button type="button" className='buttonBed' onClick={handleRegisterClick}>Registrar cama</button>
                        </div>
                    </div>
                    <DataTable 
                        columns={columns}
                        data={filteredBeds}
                        responsive={true}
                        selectableRows
                        fixedHeader
                        pagination
                        paginationComponentOptions={paginacionOpciones}
                    />
                </div>
            </div>
            {showRegisterBed && <RegisterBed onCancelClick={handleCancelClick} idGreenhouse={idGreenhouse} />}
            {showEditBed && <EditBed onCancelClick={handleCancelClick} idBed={idBed} idGreenhouse={idGreenhouse}  />}
        </div>
    );
};

export default DTableBeds;
