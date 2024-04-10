import React from 'react';
import './HomeWorker.css';
import SidebarWorker from '../SidebarWorker/SidebarWorker';
import NavbarWorker from '../NavbarWorker/NavbarWorker';
import DataTableWorker from '../DataTableWorker/DataTableWorker';

const HomeWorker = () => {

  return (
    <div>
      <NavbarWorker />
      <div className='dashboard'>
          <SidebarWorker />
        <div className='table-container'>
          <div className='space'>
          <h2>Bienvenido <span className='rol'>trabajador</span></h2>
          </div>
          <DataTableWorker/>
        </div>
      </div>
    </div>

  );
};

export default HomeWorker;