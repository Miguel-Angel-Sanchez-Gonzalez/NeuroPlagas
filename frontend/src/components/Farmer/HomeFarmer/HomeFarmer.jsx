import React, { useEffect } from 'react';
import './HomeFarmer.css';
import SidebarFarmer from '../SidebarFarmer/SidebarFarmer';
import NavbarFarmer from '../NavbarFarmer/NavbarFarmer';
import DataTableFarmer from '../DataTableFarmer/DataTableFarmer';

const HomeFarmer = () => {
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
      <NavbarFarmer />
      <div className='dashboard'>
          <SidebarFarmer />
        <div className='table-container'>
          <div className='space'>
          <h2>Bienvenido <span className='rol'>agricultor</span></h2>
          </div>
          <DataTableFarmer />
        </div>
      </div>
    </div>
  );
};

export default HomeFarmer;
