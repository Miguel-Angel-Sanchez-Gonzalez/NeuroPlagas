import React from 'react';
import './DeleteWorkerGreen.css';

const DeleteWorkerGreen = ({ onCancelClick, idWorkerGreenhouse }) => {

  const onConfirmClick = () => {
    fetch(`http://localhost:3000/worker/deleteAsignGreenhouse/${idWorkerGreenhouse}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert("El invernadero se ha desasignado con éxito");
          onCancelClick();
          window.location.reload();
        } else {
          alert("Error al desasignar el invernadero");
        }
      })
      .catch(error => {
        console.error('Error al desasignar el invernadero:', error);
        alert("Error al desasignar el invernadero");
      });
  }
  
  return (
    <div className="delete-farmer-form ">
      <div className='container-delete-farmer'>
      <h4  className='h4-delete'>Desasignar Invernadero</h4>
        <label>¿Está seguro que desea desasignar este invernadero?</label>
      </div>
      <div className='button-container-farmer'>
        <button className='button-delete-farmer' type="submit" onClick={onConfirmClick}>Desasignar</button>
        <button className='btn-delete-farmer-cancel' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteWorkerGreen;
