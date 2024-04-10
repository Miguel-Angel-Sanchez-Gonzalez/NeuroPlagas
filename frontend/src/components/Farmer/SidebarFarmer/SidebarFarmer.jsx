import React from 'react';
import './SidebarFarmer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPersonDigging, faChartBar, faWarehouse, faBug, faVirus } from '@fortawesome/free-solid-svg-icons';

const SidebarFarmer = () => {
    return (
        <div className='menu'>
            <div className='menu--list'>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faBell} className='icon'/> {/* Icono de notificaciones */}
                    Notificaciones
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faWarehouse} className='icon'/> {/* Icono de invernadero */}
                    Invernadero
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faPersonDigging} className='icon'/> {/* Icono de trabajador */}
                    Trabajador
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faChartBar} className='icon'/> {/* Icono de reportes */}
                    Reporte
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faBug} className='icon'/> {/* Icono de plagas */}
                    Plaga
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faVirus} className='icon'/> {/* Icono de enfermedades */}
                    Enfermedad
                </a>
            </div>
        </div>
    );
};

export default SidebarFarmer;

