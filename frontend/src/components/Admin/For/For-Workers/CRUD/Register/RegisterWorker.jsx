import React, { useState } from 'react';
import './RegisterWorker.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';
import ResponsibleFarmerInWorker from '../../ComboBox/ResponsibleFarmerInWorker';

const RegisterWorker = ({ onCancelClick }) => {
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
    contrasenia:"",
  });

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setValues(values => ({
      ...values,
      [name]: value,
    }));
    if (name === 'correo') {
      setEmailExists(false);
    }
  };


  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };

  
  const checkEmailExists = async (email) => {
    const response = await fetch(`http://localhost:3000/login/check_email_existence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email })
    });
    const data = await response.json();
    return data.exists;
  };
  
  //VALIDACIONES
  const validateEmail = (email) => {
    // Que el correo sea Gmail, Hotmail, Yahoo o Outlook
    const emailPattern = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|itoaxaca\.edu.mx)$/;
    return emailPattern.test(email); //true si es valido
  };
  
  const validatePhone = (phoneNumber) => {
    const phonePattern = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})?[-.]?([0-9]{4})$/;
    return phonePattern.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < 8) {
      return "Debe tener al menos 8 caracteres.";
    }
    if (!hasUpperCase) {
      return "Debe tener al menos una letra mayúscula.";
    }
    if (!hasNumber) {
      return "Debe tener al menos un número.";
    }
    if (!hasSpecialChar) {
      return "Debe tener al menos un caracter especial.";
    }
    return true;
  };
  
  //PARA CREAR AL TRABAJADOR
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); 

    

    for (const key in values) {
      if (values[key] === "") {
        setRecords('Por favor complete todos los campos.');
        return;
      }
    }

    //Validando el correo
    if (!validateEmail(values.correo)) {
      //setRecords('El correo electrónico no es válido.');
      return;
    }

    //Validando que el correo exista
    const emailExists = await checkEmailExists(values.correo);
    if (emailExists) {
      setEmailExists(true);
      return;
    }
    
    // const phoneValidate = validatePhone(values.telefono);
    if (!validatePhone(values.telefono)) {
      setRecords('Teléfono no válido (10 dígitos).');
      return;
    }

    const passwordValidationResult = validatePassword(values.contrasenia);
    if (passwordValidationResult !== true) {
      setPasswordError(passwordValidationResult);
      return;
    }

    setIsLoading(true);
    const data = {
      name: values.nombre,
      surname: values.primerApellido,
      secondSurname: values.segundoApellido,
      phone: values.telefono,
      email: values.correo,
      nameUser: values.nombreUsuario,
      password: values.contrasenia,
      role: "worker",
      idFarmer: idFarmer
    };

    //Se esta haciendo la promesa
    //Post para insertar los datos de un agricultor
    const response = await fetch(`http://localhost:3000/worker/${idFarmer}`, {
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
          setLoadingMessage('Se ha agregado correctamente el trabajador.');
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
        <div className="register-worker-container">
          <div className='centrar-worker'>
          <h4 className='h4register-worker'>Registre trabajador</h4>
          <h5 className='h5register-worker'>*Campos requeridos</h5>
          <label className='label-dato-worker'>Registre sus datos personales</label>
          <div className="form-sec-worker-register">
            <div className="column-register-worker">
                <label className={`label-worker-r ${isFormSubmitted && !values.nombre && 'red-label'}`}>
                  Nombre*
                </label>
              <input
                className= {`inputs-register-worker ${isFormSubmitted && !values.nombre && 'red-input'}`}
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
            <div className="column-register-worker">
                <label className={`label-worker-r ${isFormSubmitted && !values.primerApellido && 'red-label'}`}>
                  Primer apellido*
                </label>
              <input
                className= {`inputs-register-worker ${isFormSubmitted && !values.primerApellido && 'red-input'}`}
                type="text"
                required
                name="primerApellido"
                placeholder="Ingrese su primer apellido"
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-register-worker">
                <label className={`label-worker-r ${isFormSubmitted && !values.segundoApellido && 'red-label'}`}>
                  Segundo apellido*
                </label>
              <input
                className= {`inputs-register-worker ${isFormSubmitted && !values.segundoApellido && 'red-input'}`}
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
          <div className="form-sec-worker-register">
            <div className="column-register-worker">
                <label className={`label-worker-r ${isFormSubmitted && !values.correo && 'red-label'}`}>
                  Correo*
                </label>
              <input
                  className={`inputs-register-farmer2 ${isFormSubmitted && !values.correo ? 'red-input' : ''}`}
                  type="email"
                  required
                  name="correo"
                  placeholder="ejemplo@gmail.com"
                  value={values.correo}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={async () => {
                    handleInputBlur();
                    if (values.correo) {
                      if (!validateEmail(values.correo)) {
                      setEmailExists(false);
                    } else {
                      const emailExists = await checkEmailExists(values.correo);
                      setEmailExists(emailExists);
                    }
                  }
                  }}
                />
                {values.correo && !validateEmail(values.correo) && isFormSubmitted && (
                  <p className="error-message-worker">Correo electrónico inválido.</p>
                )}
                {emailExists && 
                <p className="email-exists-r">El correo ya existe.</p>}    
            </div>
            <div className="column-register-worker">
                <label className={`label-worker-r ${isFormSubmitted && !values.telefono && 'red-label'}`}>
                  Teléfono*
                </label>
              <input
                className={`inputs-register-worker2 ${isFormSubmitted && !values.telefono && 'red-input'}`}
                type="text"
                required
                name="telefono"
                maxLength="10"
                placeholder="Ingrese su número telefónico"
                value={values.telefono}
                onFocus={handleInputFocus} // Nuevo evento de enfoque
                onBlur={handleInputBlur}   // Nuevo evento de desenfoque
                onChange={(e) => {
                  // Filtra solo dígitos y limita a 10 caracteres
                  const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setValues(prevState => ({
                    ...prevState,
                    telefono: phoneNumber,
                  }));
                }}
              />
            </div>
            <div></div>
          </div>
          <div className='espacio'>
            <label className='label-dato-worker'>Registre sus datos de inicio de sesión</label>
          </div>
          <div className="form-sec-worker-register">
            <div className="column-register-worker">
                <label className={`label-worker-r ${isFormSubmitted && !values.nombreUsuario && 'red-label'}`}>
                  Nombre de usuario*
                </label>
                <input
                  className= {`inputs-register-worker2 ${isFormSubmitted && !values.nombreUsuario && 'red-input'}`}
                  type="text"
                  required
                  name="nombreUsuario"
                  placeholder="Ingrese su nombre de usuario"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus} 
                  onBlur={handleInputBlur} 
                />
            </div>
            <div className="column-register-worker">
                <label className={`label-worker-r ${isFormSubmitted && !values.contrasenia && 'red-label'}`}>
                  Contraseña*
                </label>
                <input
                  className= {`inputs-register-worker2 ${isFormSubmitted && !values.contrasenia && 'red-input'}`}
                  type="password"
                  name="contrasenia"
                  placeholder="Contraseña"
                  minLength="8"
                  onChange={(e) => handleInputChange(e)}
                  onFocus={handleInputFocus} 
                  onBlur={handleInputBlur} 
                />
                {isFormSubmitted && !values.contrasenia && <p className="error-password">Por favor ingrese una contraseña.</p>}
                {passwordError && <p className="error-password">{passwordError}</p>}
            </div>
          </div>
          <div className="password-rules-worker-r">
            <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
            <br/>
            <label>*Debe incluir al menos: una mayúscula, número y un símbolo (Todos son válidos).</label>
          </div>
          <label className='label-dato-worker'>Asigne su agricultor</label>
          <div className="form-sec-worker-register">
            <div className="column-register-worker">
              <label className='label-worker-r'>Agricultor responsable*</label>
              <ResponsibleFarmerInWorker
                idFarmer={idFarmer}
                setIdFarmer={setIdFarmer}
                isFormSubmitted={isFormSubmitted}
            />
            </div>
          </div>
            <div className='button-container-admin'>
                <button className='button-worker' type="submit" onClick={handleSubmit}>Guardar</button>
                <button className='button-worker ' onClick={onCancelClick}>Cancelar</button>
            </div>
                {records && !isInputFocused && <p className='error-message'>{records}</p>}
            </div>
            {loadingMessage && (
            <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification"/>
          )}
          </div>
        </div>
    );
  };

export default RegisterWorker;