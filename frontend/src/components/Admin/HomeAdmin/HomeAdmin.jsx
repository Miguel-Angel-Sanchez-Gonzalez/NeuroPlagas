import React, { useEffect } from 'react';
import './HomeAdmin.css';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import DataTableAdmin from '../DataTableAdmin/DataTableAdmin';

const HomeAdmin = () => {

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Eliminar el token cuando la pestaña se vuelve invisible
        localStorage.removeItem('token');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      <NavbarAdmin />
      <div className='dashboard'>
          <SidebarAdmin />
        <div className='table-container'>
          <div className='space'>
          <h2>Bienvenido <span className='rol'>administrador</span></h2>
          </div>
          <DataTableAdmin/>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin; 
