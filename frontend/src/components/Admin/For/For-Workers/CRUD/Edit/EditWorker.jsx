import React, { useState } from 'react';
import './EditWorker.css';
import ResponsibleFarmerInWorker from '../../ComboBox/ResponsibleFarmerInWorker';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const EditWorker = ({onCancelClick }) => {
  const [records, setRecords] = useState('');
  const [idFarmer, setIdFarmer] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: "",
    nombreUsuario: "",
    contrasenia:""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };
  
  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="edit-worker-container">
        <div className='centrar-worker'>
          <h4 className='h4edit-worker'>Editar trabajador</h4>
          <h5 className='h5edit-worker'>*Campos requeridos</h5>
          <label className='label-dato-worker'>Edite sus datos personales</label>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.nombre && 'red-label'}`}>
                Nombre*
              </label>
              <input
                className= {`inputs-edit-worker ${isFormSubmitted && !values.nombre && 'red-input'}`}
                type="text"
                required
                name="nombre"
                placeholder="Ingrese su nombre"
                value={values.nombre}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.primerApellido && 'red-label'}`}>
                Primer apellido*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="primerApellido"
                placeholder="Ingrese su primer apellido"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.segundoApellido && 'red-label'}`}>
                Segundo apellido*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="segundoApellido"
                placeholder="Ingrese su segundo apellido"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
          </div>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.correo && 'red-label'}`}>
                Correo*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="correo"
                placeholder="ejemplo@gmail.com"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.telefono && 'red-label'}`}>
                Teléfono*
              </label>
              <input
                className='inputs-edit-worker'
                type="text"
                required
                name="telefono"
                placeholder="Ingrese su número telefónico"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div></div>
          </div>
          <div className='espacio'>
            <label className='label-dato-worker'>Edite sus datos de inicio de sesión</label>
          </div>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.nombreUsuario && 'red-label'}`}>
                Nombre de usuario*
              </label>
              <input
                className='inputs-edit-worker2'
                type="text"
                required
                name="nombreUsuario"
                placeholder="Ingrese su nombre de usuario"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-worker">
              <label className={`label-worker-e ${isFormSubmitted && !values.contrasenia && 'red-label'}`}>
                  Contraseña*
                </label>
              <input
                className='inputs-edit-worker2'
                type="password"
                required
                name="contrasenia"
                placeholder="Contraseña"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
          </div>
          <div className="password-rules-worker-e">
            <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
            <br />
            <label>*Debe incluir al menos: una mayúscula, número y un símbolo (Todos son válidos).</label>
          </div>
          <label className='label-dato-worker'>Asigne su agricultor</label>
          <div className="form-sec-worker-edit">
            <div className="column-edit-worker">
              <label className='label-worker-e'>Agricultor responsable*</label>
              <ResponsibleFarmerInWorker
                idFarmer={idFarmer}
                setIdFarmer={setIdFarmer}
                isFormSubmitted={isFormSubmitted}
            />
            </div>
          </div>
              <div className='button-container-admin'>
                <button className='button-worker' type="submit">Guardar</button>
                <button className='button-worker ' onClick={onCancelClick}>Cancelar</button>
              </div>
              {records && !isInputFocused && <p className='error-message'>{records}</p>}
            </div>
            {loadingMessage && (
              <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification" />
            )}
          </div>
        </div>
  );
};

export default EditWorker;