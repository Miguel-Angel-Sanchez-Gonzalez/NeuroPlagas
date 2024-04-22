import React, { useState } from 'react';
import './DeleteDisease.css';

const DeleteDisease = ({ onCancelClick }) => {
  

  return (
    <div className="delete-disease-form">
      <div className='container-delete-disease'>
      <h4 className='h4-delete'>Eliminar enfermedad</h4>
        <label>¿Está seguro que desea eliminar esta enfermedad?</label>
      </div>
      <div className='button-container-disease'>
        <button className='button-delete-disease ' type="submit" >Eliminar</button>
        <button className='btn-delete-disease-cancel ' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteDisease;
