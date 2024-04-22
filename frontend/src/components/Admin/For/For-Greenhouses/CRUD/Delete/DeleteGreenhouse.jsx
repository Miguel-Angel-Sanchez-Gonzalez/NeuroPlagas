import React, { useState } from 'react';
import './DeleteGreenhouse.css';

const DeleteGreenhouse = ({ onCancelClick }) => {
  return (
    <div className="delete-greenhouse-form">
      <div className='container-delete-greenhouse'>
      <h4 className='h4-delete'>Eliminar invernadero</h4>
        <label>¿Está seguro que desea eliminar esta invernadero?</label>
      </div>
      <div className='button-container-greenhouse'>
        <button className='button-delete-greenhouse ' type="submit" >Eliminar</button>
        <button className='btn-delete-greenhouse-cancel ' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteGreenhouse;
