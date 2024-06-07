import React, { useState, useEffect } from 'react';
import './DeleteWorkerGreen.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const DeleteWorkerGreen = ({ onCancelClick, idWorkerGreenhouse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');


  const onConfirmClick = () => {
    
    fetch(`http://localhost:3000/worker/deleteAsignGreenhouse/${idWorkerGreenhouse}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          setIsLoading(true);
          setLoadingMessage('El invernadero se ha desasignado con éxito.');
          setTimeout(() => {
            setLoadingMessage('');
            window.location.reload();
          }, 2000);
        } else {
          alert("Error al desasignar el invernadero");
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error al desasignar el invernadero:', error);
        alert("Error al desasignar el invernadero");
        setIsLoading(false);
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
      {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification" />
          )}
    </div>
  );
};

export default DeleteWorkerGreen;
