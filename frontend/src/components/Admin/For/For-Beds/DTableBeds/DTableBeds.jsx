import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './DTableBeds.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RegisterBed from '../CRUD/Register/RegisterBed';
import EditBed from '../CRUD/Edit/EditBed';

const DTableBeds = ({ isLoading, noBedsMessage }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredBeds, setFilteredBeds] = useState([]);
    const [idBed, setIDBed] = useState(null); // Inicializar como null para evitar problemas de referencia
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
            if (response.status === 200) {
                const data = await response.json();
                setBeds(data);
                setFilteredBeds(data);
            } else {
                throw new Error('Error al obtener las camas');
            }
        } catch (error) {
            console.error('Error al obtener las camas:', error);
            alert('Error al obtener las camas:');
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
    };

    const handleEditClick = (row) => {
        setIDBed(row.id_cama);
        setShowEditBed(true);
    };

    const handleDeleteClick = (row) => {
        setIDBed(row.id_cama);
        // Aquí puedes agregar la lógica para mostrar un modal de confirmación de eliminación
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
                <h1 className='h2green-bed'>Invernadero <span className='name-bed'>{nameGreenhouse}</span></h1>
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
                    {isLoading ? (
                    <div className="loading-message">Espere un momento, se están cargando las camas...</div>
                ) : filteredBeds.length > 0 ? (
                    <DataTable 
                        columns={columns}
                        data={filteredBeds}
                        responsive={true}
                        selectableRows
                        fixedHeader
                        pagination
                        paginationComponentOptions={paginacionOpciones}
                    />
                ) : (
                    <div className="no-beds-message">{noBedsMessage || "Aún no se han registrado camas para este invernadero."}</div>
                )}
                </div>
            </div>
            {showRegisterBed && <RegisterBed onCancelClick={handleCancelClick} idGreenhouse={idGreenhouse} />}
            {showEditBed && idBed !== null && <EditBed onCancelClick={handleCancelClick} idBed={idBed} idGreenhouse={idGreenhouse} />}
            {/* Aquí puedes agregar el componente para la eliminación de camas */}
        </div>
    );
       
};

export default DTableBeds;
