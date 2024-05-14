import React, { useState } from 'react';
import NavbarAdmin from '../NavSideProfileAdmin/NavbarAdmin/NavbarAdmin';
import SidebarAdmin from '../NavSideProfileAdmin/SidebarAdmin/SidebarAdmin';
import DTableDiseases from '../For/For-Diseases/DTableDiseases/DTableDiseases';
import DTableFarmers from '../For/For-Farmers/DTableFarmers/DTableFarmers';
import ProfileAdmin from '../NavSideProfileAdmin/ProfileAdmin/ProfileAdmin';
import DTableGreenhouses from '../For/For-Greenhouses/DTableGreenhouses/DTableGreenhouses';
import DTablePlagues from '../For/For-Plagues/DTablePlagues/DTablePlagues';
import DTableWorkers from '../For/For-Workers/DTableWorkers/DTableWorkers';
import './HomeAdmin.css'; // Importa tus estilos CSS aquí

const HomeAdmin = () => {
    const [activeSection, setActiveSection] = useState('farmers'); // Establece la sección activa inicialmente como 'farmers'
    const [showProfileAdmin, setshowProfileAdmin] = useState(false);
   
    const handleConfigureProfileClick = () => {
        setshowProfileAdmin(true);
    };

    const handleProfileFormCancel = () => {
        setshowProfileAdmin(false);
    };

    const renderActiveTable = () => {
        switch (activeSection) {
            case 'farmers':
                return <DTableFarmers />;
            case 'greenhouses':
                return <DTableGreenhouses />;
            case 'workers':
                return <DTableWorkers />;
            case 'plagues':
                return <DTablePlagues />;
            case 'diseases':
                return <DTableDiseases />;
            default:
                return null;
        }
    };

    return (
        <div >
            <div className="navbar-container-admin">
                <NavbarAdmin onConfigureProfileClick={handleConfigureProfileClick} />
            </div>
            <div className='dashboard-admin'>
            <SidebarAdmin setActiveSection={setActiveSection} activeSection={activeSection} />
                <div className='table-container-admin'>
                    <div className='space-admin'>
                        {/* <h2 className='h2admin'>Bienvenido <span className='rol-admin'>administrador</span></h2> */}
                        {renderActiveTable()}
                    </div>
                </div>
            </div>
            {showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />}
        </div>
    );
};

export default HomeAdmin;
