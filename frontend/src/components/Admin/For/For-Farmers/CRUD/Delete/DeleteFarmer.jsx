import React from 'react';
import './DeleteFarmer.css';

const DeleteFarmer = ({ onCancelClick, idFarmer }) => {

  const onConfirmClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/farmer/${idFarmer}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert("El agricultor se eliminó correctamente");
        onCancelClick();
        window.location.reload();
      } else {
        alert("Error al eliminar el agricultor");
      }
    } catch (error) {
      console.error('Error al eliminar el agricultor:', error);
      alert("Error al eliminar el agricultor");
    }
  };

  return (
    <div className="delete-farmer-form">
      <div className='container-delete-farmer'>
        <h4 className='h4-delete'>Eliminar agricultor</h4>
        <label>¿Está seguro que desea eliminar este agricultor?</label>
      </div>
      <div className='button-container-farmer'>
        <button className='button-delete-farmer' type="submit" onClick={onConfirmClick}>Eliminar</button>
        <button className='btn-delete-farmer-cancel' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteFarmer;
