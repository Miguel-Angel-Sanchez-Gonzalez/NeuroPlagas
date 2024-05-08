import React, { useState } from 'react';
import './HomeWorker.css';
import DataTableWorker from '../DataTableWorker/DataTableWorker';
import NavbarWorker from '../NavSideProfileWorker/NavbarWorker/NavbarWorker';
import SidebarWorker from '../NavSideProfileWorker/SidebarWorker/SidebarWorker';

const HomeWorker = () => {
  const [activeSection, setActiveSection] = useState('notifications'); // Establece la sección activa inicialmente como 'workers'
  const [showProfileAdmin, setshowProfileAdmin] = useState(false);

  const handleConfigureProfileClick = () => {
    setshowProfileAdmin(true);
};

const handleProfileFormCancel = () => {
    setshowProfileAdmin(false);
};

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden') {
  //       // Eliminar el token cuando la pestaña se vuelve invisible
  //       localStorage.removeItem('token');
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);

  const renderActiveTable = () => {
    switch (activeSection) {
        case 'notifications':
            return <DataTableWorker />;
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
        <div className="navbar-container-worker">
            <NavbarWorker onConfigureProfileClick={handleConfigureProfileClick} />
        </div>
        <div className='dashboard-worker'>
        <SidebarWorker setActiveSection={setActiveSection} activeSection={activeSection} />
            <div className='table-container-worker'>
                <div className='space-worker'>
                    <h2 className='h2worker'>Bienvenido <span className='rol-worker'>trabajador</span></h2>
                    {renderActiveTable()}
                </div>
            </div>
        </div>
        {/*showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />*/}
    </div>
);
};
export default HomeWorker;
