import React from 'react';
import './SidebarWorker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBug, faChartBar, faWarehouse } from '@fortawesome/free-solid-svg-icons';

const SidebarWorker = () => {
    return (
        <div className='menu'>
            <div className='menu--list'>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faBell} className='icon'/>
                    Notificaciones
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faWarehouse} className='icon'/>
                    Invernadero
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faBug} className='icon'/>
                    Plagas
                </a>
                <a href="#" className='item'>
                    <FontAwesomeIcon icon={faChartBar} className='icon'/>
                    Enfermedades
                </a>
            </div>
        </div>
    );
};

export default SidebarWorker;
