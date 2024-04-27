import React, { useState } from 'react';
import './DeleteWorker.css';

const DeleteWorker = ({ onCancelClick }) => {
  

  return (
    <div className="delete-farmer-form ">
      <div className='container-delete-farmer'>
      <h4  className='h4-delete'>Eliminar trabajador</h4>
        <label>¿Está seguro que desea eliminar este trabajador?</label>
      </div>
      <div className='button-container-farmer'>
        <button className='button-delete-farmer' type="submit" >Eliminar</button>
        <button className='btn-delete-farmer-cancel' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteWorker;
