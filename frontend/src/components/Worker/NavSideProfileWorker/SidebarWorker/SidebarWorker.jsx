import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBug, faWarehouse, faVirus } from '@fortawesome/free-solid-svg-icons';
import './SidebarWorker.css';

const SidebarWorker = ({ setActiveSection, activeSection }) => {
    const handleItemClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className='menu-worker'>
            <div className='menu-list-worker'>
                <a href="#" onClick={() => handleItemClick('notifications')} className={`item-worker ${activeSection === 'notifications' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBell} className='icon'/> {/* Icono de notificaciones */}
                    Notificaciones
                </a>
                <a href="#" onClick={() => handleItemClick('greenhouses')} className={`item-worker ${activeSection === 'greenhouses' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faWarehouse} className='icon'/> {/* Icono de invernadero */}
                    Invernadero
                </a>
                <a href="#" onClick={() => handleItemClick('plagues')} className={`item-worker ${activeSection === 'plagues' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBug} className='icon'/> {/* Icono de plaga */}
                    Plaga
                </a>
                <a href="#" onClick={() => handleItemClick('diseases')} className={`item-worker ${activeSection === 'diseases' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faVirus} className='icon'/> {/* Icono de enfermedad */}
                    Enfermedad
                </a>
            </div>
        </div>
    );
};

export default SidebarWorker;
