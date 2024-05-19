import React, { useState, useEffect } from 'react';
import './EditBed.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const EditBed = ({ onCancelClick, idGreenhouse, idBed }) => {
  const [records, setRecords] = useState('');
  const [bedExists, setBedExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [originalName, setOriginalName] = useState('');


  const [values, setValues] = useState({
    numeroCama: "",
    tipoCultivo: ""
  });


  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setValues(values => ({
      ...values,
      [name]: value,
    }));
    // if (name === 'numeroCama') {
    //   setBedExists(false);
    // }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };



  //Para obtener la data del Greenhouse y setearla en los INPUT
  useEffect(() => {
    const getGreenhouseById = () => {
      fetch(`http://localhost:3000/bed/${idBed}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al obtener la cama seleccionada');
        })
        .then(data => {
          console.log("Datos recibidos:", data);
          setValues({
            numeroCama: data.numero_cama,
            tipoCultivo: data.tipo_cultivo
          });
        })
        .catch(error => {
          console.error('Error al obtener la cama:', error);
          setIsLoading(false);
        });
    };
    getGreenhouseById();
  }, [idGreenhouse]);

  
  //Data para el fetch de actualizacion
  const data = {
    idGreenhouse : idGreenhouse,
    numberBed: values.numeroCama,
    typeCrop: values.tipoCultivo
  };

  const onConfirmClick = async () => {
    setIsFormSubmitted(true);
  
    // Validación específica para cada campo
    if (values.numeroCama === "" || values.tipoCultivo === "") {
      setRecords('Por favor complete todos los campos.');
      return;
    }
    updateBedData();
  };

  const updateBedData = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/bed/${idBed}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        setIsLoading(false);
        setLoadingMessage('La cama se actualizó correctamente.');
        setTimeout(() => {
          setLoadingMessage(''); // Oculta el mensaje después de unos segundos
          window.location.reload();
        }, 2000); 
      } else {
        throw new Error('No se pudo actualizar la cama seleccionada');
      }
    })
    .catch(error => {
      console.error('Error al actualizar la cama seleccionada:', error);
      alert("Error al actualizar la cama seleccionada");
      setIsLoading(false);
    });
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
        <div className="edit-bed-container">
          <div className='centrar-bed'>
          <h4 className='h4edit-bed'>Edite cama</h4>
          <h5 className='h5edit-bed'>*Campos requeridos</h5>
          <label className='label-dato-bed'>Edite una nueva cama</label>
          <div className="form-sec-bed-edit">
            <div className="column-edit-bed">
              <label className={`label-bed-e ${isFormSubmitted && !values.numeroCama && 'red-label'}`}>
                Número de la cama*
              </label>
              <input
                className={`inputs-edit-bed ${isFormSubmitted && !values.numeroCama && 'red-input'}`}
                type="text"
                required
                name="numeroCama"
                placeholder="Ingrese el número de cama"
                value={values.numeroCama}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.numeroCama ? {  backgroundColor: '#EFF6FF' } : null}   
              />
            </div>
            <div className="column-edit-bed">
              <label className={`label-bed-e ${isFormSubmitted && !values.tipoCultivo && 'red-label'}`}>
                Tipo de cultivo*
              </label>
              <input
                className={`inputs-edit-bed ${isFormSubmitted && !values.tipoCultivo && 'red-input'}`}
                type="text"
                required
                name="tipoCultivo"
                placeholder="Ingrese el tipo de cultivo"
                value={values.tipoCultivo}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.tipoCultivo ? {  backgroundColor: '#EFF6FF' } : null}   
              />
            </div>
          </div>
          
          <div className='button-container-bed '>
              <button className='button-bed' type="submit" onClick={onConfirmClick}>Guardar</button>
              {/* {isLoading ? 'Enviando..' : 'Enviar'} */}
              <button className='button-bed ' onClick={onCancelClick}>Cancelar</button>
            </div>
            {records && !isInputFocused && <p className='error-message-bed-e'>{records}</p>}
            </div>
            {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification"/>
          )}
        </div>
        </div>
  );
};

export default EditBed;
