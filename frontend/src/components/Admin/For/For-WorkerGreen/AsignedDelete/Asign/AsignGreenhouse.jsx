import React, { useState } from 'react';
import { toast } from "react-toastify";
import './AsignGreenhouse.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';
import ComboBoxGreenHouse from '../../../../../Dashboard/ComboBoxGreenHouse/ComboBoxGreenHouse';

const AsignGreenhouse = ({ onCancelClick, idWorker, idFarmer, onUpdateGreenhouses }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [idGreenhouse, setIdGreenhouse] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSelectionChange = (selectedGreenhouseName, selectedGreenhouseId) => {
    setIdGreenhouse(selectedGreenhouseId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (!idGreenhouse) {
      setLoadingMessage('Por favor, seleccione un invernadero antes de guardar.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/worker/asigngreenhouse/${idWorker}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idGreenhouse })
      });

      if (response.ok) {
        toast.success('Se ha asignado correctamente el invernadero.', {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        onCancelClick();
        onUpdateGreenhouses();  // Actualizar la lista de invernaderos
      } else {
        throw new Error('Error al asignar el invernadero.');
      }
    } catch (error) {
      toast.error(`Hubo un error al registrar al trabajador: ${error}`, {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="register-bed-container">
        <div className="centrar-bed">
          <h4 className="h4register-bed">Asignar invernadero al trabajador</h4>
          <h5 className="h5register-bed">*Campo requerido</h5>
          <label className="label-dato-bed">Por favor, seleccione un invernadero</label>
          <ComboBoxGreenHouse onChange={handleSelectionChange} />
          <div className="button-container-bed">
            <button className="button-bed" type="submit" onClick={handleSubmit}>Guardar</button>
            <button className="button-bed" onClick={onCancelClick}>Cancelar</button>
          </div>
          {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AsignGreenhouse;
