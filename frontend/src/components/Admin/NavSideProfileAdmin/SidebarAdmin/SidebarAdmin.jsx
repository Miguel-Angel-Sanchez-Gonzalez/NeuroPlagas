import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeUser, faWarehouse, faPersonDigging, faChartBar, faBug, faVirus } from '@fortawesome/free-solid-svg-icons';
import './SidebarAdmin.css';

const SidebarAdmin = ({ setActiveTable, activeTable }) => {
    const [selectedItem, setSelectedItem] = useState(activeTable);

    const handleItemClick = (table) => {
        setActiveTable(table);
        setSelectedItem(table);
    };

    return (
        <div className='menu-admin'>
            <div className='menu-list-admin'>
                <a href="#" onClick={() => handleItemClick('farmers')} className={`item-admin ${selectedItem === 'farmers' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faHomeUser} className='icon'/> {/* Icono de agricultor */}
                    Agricultor
                </a>
                <a href="#" onClick={() => handleItemClick('greenhouses')} className={`item-admin ${selectedItem === 'greenhouses' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faWarehouse} className='icon'/> {/* Icono de invernadero */}
                    Invernadero
                </a>
                <a href="#" onClick={() => handleItemClick('workers')} className={`item-admin ${selectedItem === 'workers' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faPersonDigging} className='icon'/> {/* Icono de trabajador */}
                    Trabajador
                </a>
                <a href="#" onClick={() => handleItemClick('reporte')} className={`item-admin ${selectedItem === 'reporte' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faChartBar} className='icon'/> {/* Icono de reporte */}
                    Reporte
                </a>
                <a href="#" onClick={() => handleItemClick('plagues')} className={`item-admin ${selectedItem === 'plagues' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBug} className='icon'/> {/* Icono de plaga */}
                    Plaga
                </a>
                <a href="#" onClick={() => handleItemClick('diseases')} className={`item-admin ${selectedItem === 'diseases' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faVirus} className='icon'/> {/* Icono de enfermedad */}
                    Enfermedad
                </a>
            </div>
        </div>
    );
};

export default SidebarAdmin;
