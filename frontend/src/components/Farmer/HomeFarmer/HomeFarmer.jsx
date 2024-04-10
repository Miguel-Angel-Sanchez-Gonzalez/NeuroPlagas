import React from 'react';
import './HomeFarmer.css';
import SidebarFarmer from '../SidebarFarmer/SidebarFarmer'
import NavbarFarmer from '../NavbarFarmer/NavbarFarmer';
import DataTableFarmer from '../DataTableFarmer/DataTableFarmer';

const HomeFarmer = () => {

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