import React, { useState } from 'react';
import './DeleteDisease.css';

const DeleteDisease = ({ onCancelClick, idDisease }) => {
  
  const onConfirmClick = () => {
    fetch(`http://localhost:3000/disease/${idDisease}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert("La enfermedad se eliminó correctamente");
          onCancelClick();
          window.location.reload();
        } else {
          alert("Error al eliminar la enfermedad");
        }
      })
      .catch(error => {
        console.error('Error al eliminar la enfermedad:', error);
        alert("Error al eliminar la enfermedad");
      });
  }

  return (
    <div className="delete-disease-form">
      <div className='container-delete-disease'>
      <h4 className='h4-delete'>Eliminar enfermedad</h4>
        <label>¿Está seguro que desea eliminar esta enfermedad?</label>
      </div>
      <div className='button-container-disease'>
        <button className='button-delete-disease ' type="submit" onClick={onConfirmClick}>Eliminar</button>
        <button className='btn-delete-disease-cancel ' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteDisease;
