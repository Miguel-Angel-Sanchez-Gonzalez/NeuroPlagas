import React, { useState } from 'react';
import './DeletePlague.css';

const DeletePlague = ({ onCancelClick }) => {
  

  return (
    <div className="delete-plague-form">
      <div className='container-delete-plague'>
      <h4 className='h4-delete'>Eliminar enfermedad</h4>
        <label>¿Está seguro que desea eliminar esta enfermedad?</label>
      </div>
      <div className='button-container-plague'>
        <button className='button-delete-plague ' type="submit" >Eliminar</button>
        <button className='btn-delete-plague-cancel ' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeletePlague;
