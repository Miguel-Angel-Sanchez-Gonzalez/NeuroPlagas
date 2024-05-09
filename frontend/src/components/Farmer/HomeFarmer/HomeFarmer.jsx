import React, { useState } from 'react';
import DataTableFarmer from '../DataTableFarmer/DataTableFarmer';
import NavbarFarmer from '../NavSideProfileFarmer/NavbarFarmer/NavbarFarmer';
import SidebarFarmer from '../NavSideProfileFarmer/SidebarFarmer/SidebarFarmer';
import './HomeFarmer.css';

const HomeFarmer = () => {
  const [activeSection, setActiveSection] = useState('notifications'); // Establece la sección activa inicialmente como 'farmers'
  const [showProfileAdmin, setshowProfileAdmin] = useState(false);
   
    const handleConfigureProfileClick = () => {
        setshowProfileAdmin(true);
    };

    const handleProfileFormCancel = () => {
        setshowProfileAdmin(false);
    };

  const renderActiveTable = () => {
    switch (activeSection) {
        case 'notifications':
            return <DataTableFarmer />;
        // case 'greenhouses':
        //     return <DTableGreenhouses />;
        // case 'workers':
        //     return <DTableWorkers />;
        // case 'plagues':
        //     return <DTablePlagues />;
        // case 'diseases':
        //     return <DTableDiseases />;
        default:
            return null;
    }
  };

  return (
    <div>
        <div className="navbar-container-farmer">
            <NavbarFarmer onConfigureProfileClick={handleConfigureProfileClick} />
        </div>
        <div className='dashboard-farmer'>
        <SidebarFarmer setActiveSection={setActiveSection} activeSection={activeSection} />
            <div className='table-container-farmer'>
                <div className='space-farmer'>
                    <h2 className='h2farmer'>Bienvenido <span className='rol-farmer'>agricultor</span></h2>
                    {renderActiveTable()}
                </div>
            </div>
        </div>
        {/*showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />*/}
    </div>
);
};

export default HomeFarmer;
