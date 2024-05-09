import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPersonDigging, faChartBar, faWarehouse, faBug, faVirus } from '@fortawesome/free-solid-svg-icons';
import './SidebarFarmer.css';

const SidebarFarmer = ({ setActiveSection, activeSection }) => {
    const handleItemClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className='menu-farmer'>
            <div className='menu-list-farmer'>
                <a href="#" onClick={() => handleItemClick('notifications')} className={`item-farmer ${activeSection === 'notifications' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBell} className='icon'/> {/* Icono de notificaciones */}
                    Notificaciones
                </a>
                <a href="#" onClick={() => handleItemClick('greenhouses')} className={`item-farmer ${activeSection === 'greenhouses' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faWarehouse} className='icon'/> {/* Icono de invernadero */}
                    Invernadero
                </a>
                <a href="#" onClick={() => handleItemClick('workers')} className={`item-farmer ${activeSection === 'workers' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faPersonDigging} className='icon'/> {/* Icono de trabajador */}
                    Trabajador
                </a>
                <a href="#" onClick={() => handleItemClick('reporte')} className={`item-farmer ${activeSection === 'reporte' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faChartBar} className='icon'/> {/* Icono de reporte */}
                    Reporte
                </a>
                <a href="#" onClick={() => handleItemClick('plagues')} className={`item-farmer ${activeSection === 'plagues' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBug} className='icon'/> {/* Icono de plaga */}
                    Plaga
                </a>
                <a href="#" onClick={() => handleItemClick('diseases')} className={`item-farmer ${activeSection === 'diseases' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faVirus} className='icon'/> {/* Icono de enfermedad */}
                    Enfermedad
                </a>
            </div>
        </div>
    );
};

export default SidebarFarmer;

