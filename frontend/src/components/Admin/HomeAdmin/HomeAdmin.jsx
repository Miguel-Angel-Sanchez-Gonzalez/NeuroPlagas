import React, { useEffect, useState } from 'react';
import './HomeAdmin.css';
import NavbarAdmin from '../NavSideProfileAdmin/NavbarAdmin/NavbarAdmin';
import SidebarAdmin from '../NavSideProfileAdmin/SidebarAdmin/SidebarAdmin';
import DTableDiseases from '../For/For-Diseases/DTableDiseases/DTableDiseases';
import DTableFarmers from '../For/For-Farmers/DTableFarmers/DTableFarmers';
import ProfileAdmin from '../NavSideProfileAdmin/ProfileAdmin/ProfileAdmin';
import DTableGreenhouses from '../For/For-Greenhouses/DTableGreenhouses/DTableGreenhouses';
import DTablePlagues from '../For/For-Plagues/DTablePlagues/DTablePlagues';
import DTableWorkers from '../For/For-Workers/DTableWorkers/DTableWorkers';

const HomeAdmin = ({username}) => {
  console.log(String(username));
  const [showProfileAdmin, setshowProfileAdmin] = useState(false);
  const [activeTable, setActiveTable] = useState('farmers');

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

  const handleConfigureProfileClick = () => {
    setshowProfileAdmin(true);
  };

  const handleProfileFormCancel = () => {
    setshowProfileAdmin(false);
  };

  return (
    <div>
      <NavbarAdmin onConfigureProfileClick={handleConfigureProfileClick} username={username}/>
      <div className='dashboard-admin'>
          <SidebarAdmin setActiveTable={setActiveTable} />
        <div className='table-container-admin'>
          <div className='space-admin'>
          <h2 className='h2admin'>Bienvenido <span className='rol-admin'>administrador</span></h2>
            {activeTable === 'farmers' && <DTableFarmers />}
            {activeTable === 'greenhouses' && <DTableGreenhouses />}
            {activeTable === 'plagues' && <DTablePlagues />}
            {activeTable === 'diseases' && <DTableDiseases />}
            {activeTable === 'workers' && <DTableWorkers />}
          </div>
        </div>
      </div>
      {showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />}
    </div>
  );
};

export default HomeAdmin;
