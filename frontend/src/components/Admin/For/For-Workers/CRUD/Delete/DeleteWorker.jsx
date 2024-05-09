import React, { useState } from 'react';
import './DeleteWorker.css';

const DeleteWorker = ({ onCancelClick, idWorker }) => {

  const onConfirmClick = () => {
    fetch(`http://localhost:3000/worker/${idWorker}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert("El trabajador se eliminó correctamente");
          onCancelClick();
          window.location.reload();
        } else {
          alert("Error al eliminar el trabajador");
        }
      })
      .catch(error => {
        console.error('Error al eliminar el trabajador:', error);
        alert("Error al eliminar el invernadero");
      });
  }
  

  return (
    <div className="delete-farmer-form ">
      <div className='container-delete-farmer'>
      <h4  className='h4-delete'>Eliminar trabajador</h4>
        <label>¿Está seguro que desea eliminar este trabajador?</label>
      </div>
      <div className='button-container-farmer'>
        <button className='button-delete-farmer' type="submit" onClick={onConfirmClick}>Eliminar</button>
        <button className='btn-delete-farmer-cancel' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteWorker;
