import React, { useState, useEffect } from 'react';
import './EditGreenhouse.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';
import GreenhouseType from '../../ComboBox/GreenhouseType';
import ResponsibleFarmer from '../../ComboBox/ResponsibleFarmer';

const EditGreenhouse = ({ onCancelClick, idGreenhouse }) => {
  const [records, setRecords] = useState('');
  const [greenhouseExists, setGreenhouseExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');


  const [values, setValues] = useState({
    nombreInvernadero: "",
    tipoInvernadero: "",
    humedad: "",
    tamanio: "",
    agricultorResponsable: ""
  });

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setValues(values => ({
      ...values,
      [name]: value,
    }));
    if (name === 'nombreInvernadero') {
      setGreenhouseExists(false);
    }
  };

  //PARA LOS COMBOBOX
  const handleTypeGreenhouseSelect = (selectedOption) => {
    setValues({ ...values, tipoInvernadero: selectedOption }); // Actualiza el tipo de invernadero seleccionado
  };

  const handleRespFarmerSelect = (selectedOption) => {
    setValues({ ...values, agricultorResponsable: selectedOption }); // Actualiza el tipo de invernadero seleccionado
  };
  //

  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };

  useEffect(()=>{
    checkGreenhouseExists();
  }, []);

  /*FUNCIONES*/
  async function checkGreenhouseExists(greenhouseName){
      const response = await fetch(`http://localhost:3000/greenhouse/checkExist/${greenhouseName}`)
      const data = await response.json()
      //se están cargando los datos
      return data.exists;
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); 

    
    for (const key in values) {
      if (values[key] === "") {
        setRecords('Por favor complete todos los campos.');
        return;
      }
    }

    //Validando que el invernadero exista
    const greenhouseExists = await checkGreenhouseExists(values.nombreInvernadero);
    if (greenhouseExists) {
      setGreenhouseExists(true);
      return;
    }
    

    setIsLoading(true);
    const data = {
      // idFarmer: '2',
      name: values.nombreInvernadero,
      typeGreenhouse: values.tipoInvernadero,
      humidity: values.humedad,
      size: values.tamanio
    };

    //Se esta haciendo la promesa
    //Post para insertar los datos de un invernadero
      const response = await fetch('http://localhost:3000/greenhouse/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }) 
        if (response){
          const responseData = await response.json();
          const { id } = responseData; // Obtiene el ID del agricultor del backend
          setIsLoading(false);
          setLoadingMessage('Se ha agregado correctamente el invernadero.');
          setTimeout(() => {
          setLoadingMessage(''); // Oculta el mensaje después de unos segundos
          window.location.reload();
          }, 2000); // Mostrar el mensaje durante 3 segundos
        } else {
          setRecords('Por favor, inténtelo de nuevo más tarde.');
          setIsLoading(false); // Agregar para detener la pantalla de carga
        }
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
        <div className="edit-greenhouse-container">
          <div className='centrar-greenhouse'>
          <h4 className='h4edit-greenhouse'>Registrar invernadero</h4>
          <h5 className='h5edit-greenhouse'>*Campos requeridos</h5>
          <label className='label-dato-greenhouse'>Registre los datos del invernadero</label>
          <div className="form-sec-greenhouse-edit">
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.nombreInvernadero && 'red-label'}`}>
                Nombre del invernadero*
              </label>
              <input
                className={`inputs-edit-greenhouse ${isFormSubmitted && !values.nombreInvernadero && 'red-input'}`}
                type="text"
                required
                name="nombreInvernadero"
                placeholder="Ingrese el nombre del invernadero"
                value={values.nombreInvernadero}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={async () => {
                  handleInputBlur();
                  if (values.nombreInvernadero) {
                    const greenhouseExists = await checkGreenhouseExists(values.nombreInvernadero);
                    setGreenhouseExists(greenhouseExists);
                  }
                }}
              />
              {greenhouseExists && <p className="greenhouse-exists">El nombre del invernadero ya existe.</p>}
            </div>
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.tipoInvernadero && 'red-label'}`}>
                Tipo de invernadero*
              </label>
              <GreenhouseType
                selected={values.tipoInvernadero}
                setSelected={handleTypeGreenhouseSelect}
              />
            </div>
          </div>
          <div className="form-sec-greenhouse-edit">
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.humedad && 'red-label'}`}>
                Humedad (C°)*
              </label>
              <input
                className={`inputs-edit-greenhouse2 ${isFormSubmitted && !values.humedad && 'red-input'}`}
                type="text"
                required
                name="humedad"
                placeholder="Humedad en °C"
                value={values.humedad}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.tamanio && 'red-label'}`}>
                Tamaño (mts)*
              </label>
              <input
                className={`inputs-edit-greenhouse2 ${isFormSubmitted && !values.tamanio && 'red-input'}`}
                type="text"
                required
                name="tamanio"
                placeholder="Ingrese el tamaño en mts."
                value={values.tamanio}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
          </div>
          <br />
          <label className='label-dato-greenhouse'>Registrar datos del agricultor </label>
          <div className="form-sec-greenhouse-edit">
            <div className="column-edit-greenhouse">
              <label className={`label-greenhouse-e ${isFormSubmitted && !values.agricultorResponsable && 'red-label'}`}>
                Agricultor responsable*
              </label>
              <ResponsibleFarmer
                selected={values.agricultorResponsable}
                setSelected={handleRespFarmerSelect}
              />
            </div>
          </div>
          <div className='button-container-greenhouse '>
              <button className='button-greenhouse' type="submit" onClick={handleSubmit}>Guardar</button>
              {/* {isLoading ? 'Enviando..' : 'Enviar'} */}
              <button className='button-greenhouse ' onClick={onCancelClick}>Cancelar</button>
            </div>
            {records && !isInputFocused && <p className='error-message-greenhouse'>{records}</p>}
        </div>
        {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification"/>
          )}
        </div>
        </div>
  );
};

export default EditGreenhouse;
