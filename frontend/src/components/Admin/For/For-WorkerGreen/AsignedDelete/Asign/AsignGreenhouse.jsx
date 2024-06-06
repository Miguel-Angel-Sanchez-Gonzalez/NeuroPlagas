import React, { useState, useEffect } from 'react';
import './AsignGreenhouse.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const AsignGreenhouse = ({ onCancelClick, idWorker, idFarmer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [idGreenhouse, setIdGreenhouse] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  // useEffect(() => {
  //   getGreenByIdFarmer();
  // }, [idFarmer]);

  // //CORREGIR 
  // const getGreenByIdFarmer = async () => {
  //   const response = await fetch(`http://localhost:3000/farmer/getNameFarmers`)
  //   const data = await response.json()
  //   setOptions(data.map(greenhouse => {
  //       return {label: greenhouse.nombre, 
  //         value:greenhouse.id_invernadero}
  //   }));  
  // };

  const handleOptionClick = (option) => {
    //setIdGreenhouse(option.value);
    setSelected(option.value === undefined ? "" : option);
    setIsActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (!idGreenhouse) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/worker/asigngreenhouse/${idWorker}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idGreenhouse }) // Enviar el id del invernadero seleccionado
      });

      if (response.ok) {
        setLoadingMessage('Se ha asignado correctamente el invernadero.');
        setTimeout(() => {
          setLoadingMessage('');
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Error al asignar el invernadero.');
      }
    } catch (error) {
      alert('Por favor, inténtelo de nuevo más tarde.');
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
          <h4 className="h4register-bed">Asignar invernadero al agricultor</h4>
          <h5 className="h5register-bed">*Campo requerido</h5>
          <label className="label-dato-bed">Por favor, seleccione un invernadero</label>
          <div className="form-sec-bed-register">
            <div className="column-register-bed">
              <label className={`label-bed-r ${isFormSubmitted && !idGreenhouse ? 'red-label' : ''}`}>
                Invernaderos*
              </label>
              <div className="dropdown">
                <div
                  className={`dropdown-btn ${isFormSubmitted && !selected ? 'red-input' : ''}`}
                  style={selected ? { backgroundColor: '#EFF6FF' } : null}
                  onClick={() => setIsActive(!isActive)}
                >
                  {selected || "Seleccionar invernadero..."}
                </div>
                {isActive && (
                  <div className="dropdown-content">
                    {options.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleOptionClick(option)}
                        className="dropdown-option"
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
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