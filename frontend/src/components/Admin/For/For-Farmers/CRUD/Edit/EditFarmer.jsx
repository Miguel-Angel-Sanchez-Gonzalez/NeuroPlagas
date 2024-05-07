import React, { useState, useEffect } from 'react';
import './EditFarmer.css';
import AddNotification from '../../../../../LoginNotifications/AddNotification';

const EditFarmer = ({ onCancelClick, idFarmer }) => {
  const [records, setRecords] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [initialValues, setInitialValues] = useState({});
  

  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: "",
    nombreUsuario: "",
    contrasenia: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === 'correo') {
      setEmailExists(false);
    }
    if (name === 'contrasenia') {
      setPasswordError('');
    }
  };

  //ENFOQUES
  const handleInputFocus = () => {
    setIsInputFocused(true);
    setRecords('');
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  //VALIDACIONES
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/login/check_email_existence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error al verificar la existencia del correo:', error);
      return false;
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|itoaxaca\.edu\.mx)$/;
    return emailPattern.test(email);
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
      return "Debe tener al menos un carácter especial.";
    }
    return true;
  };

  useEffect(() => {
    const getFarmerById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/farmer/${idFarmer}`);
        if (!response.ok) {
          throw new Error('Error al obtener el agricultor');
        }
        const data = await response.json();
        setValues({
          nombre: data.nombre,
          primerApellido: data.primer_apellido,
          segundoApellido: data.segundo_apellido,
          telefono: data.telefono,
          correo: data.correo_electronico,
          nombreUsuario: data.nombre_usuario,
          contrasenia: data.contrasenia
        });
        setInitialValues(data);
      } catch (error) {
        console.error('Error al obtener el agricultor:', error);
      }
    };
    getFarmerById();
  }, [idFarmer]);

  const onConfirmClick = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    for (const key in values) {
      if (values[key] === "") {
        setRecords('Por favor complete todos los campos.');
        return;
      }
    }

    if (!validateEmail(values.correo)) {
      return;
    }

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
      role: "farmer"
    };

    fetch(`http://localhost:3000/farmer/${idFarmer}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          alert("El usuario se actualizó correctamente");
          setIsLoading(false);
          onCancelClick();
          setLoadingMessage('Se ha actualizado correctamente el agricultor.');
          setTimeout(() => {
            setLoadingMessage('');
            window.location.reload();
          }, 2000);
        } else {
          setRecords('Por favor, inténtelo de nuevo más tarde.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error al actualizar el agricultor:', error);
        alert("Error al actualizar el agricultor");
      });
  };

  const isValueModified = (name) => {
    return initialValues[name] !== values[name];
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
        <div className="edit-farmer-container">
          <div className='centrar-farmer'>
          <h4 className='h4edit-farmer'>Editar agricultor</h4>
          <h5 className='h5edit-farmer'>*Campos requeridos</h5>
          <label className='label-dato-farmer'>Edite sus datos personales</label>
          <div className="form-sec-farmer-edit">
            <div className="column-edit-farmer">
                <label className={`label-farmer-e ${isFormSubmitted && !values.nombre && 'red-label'}`}>
                  Nombre*
                </label>
              <input
              className={`inputs-edit-farmer ${isFormSubmitted && !values.nombre && 'red-input'}`}
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
            <div className="column-edit-farmer">
              <label className={`label-farmer-e ${isFormSubmitted && !values.primerApellido && 'red-label'}`}>
                Primer apellido*
              </label>
              <input
                className={`inputs-edit-farmer ${isFormSubmitted && !values.primerApellido && 'red-input'}`}
                type="text"
                required
                name="primerApellido"
                placeholder="Ingrese su primer apellido"
                value={values.primerApellido}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
            <div className="column-edit-farmer">
              <label className={`label-farmer-e ${isFormSubmitted && !values.segundoApellido && 'red-label'}`}>
                Segundo apellido*
              </label>
              <input
                className={`inputs-edit-farmer ${isFormSubmitted && !values.segundoApellido && 'red-input'}`}
                type="text"
                required
                name="segundoApellido"
                placeholder="Ingrese su segundo apellido"
                value={values.segundoApellido}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
              />
            </div>
          </div>
          <div className="form-sec-farmer-edit">
            <div className="column-edit-farmer">
            <label className={`label-farmer-e ${isFormSubmitted && !values.correo && 'red-label'}`}>
                      Correo*
                    </label>
                    <input
                      className={`inputs-edit-farmer2 ${isFormSubmitted && !values.correo ? 'red-input' : ''}`}
                      type="email"
                      required
                      name="correo"
                      placeholder="ejemplo@gmail.com"
                      value={values.correo}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur} 
                    />
                    {values.correo && !validateEmail(values.correo) && isFormSubmitted && (
                      <p className="error-message-farmer-e">Correo electrónico inválido.</p>
                    )}
                </div>
                <div className="column-edit-farmer">
                <label className={`label-farmer-r ${isFormSubmitted && !values.telefono && 'red-label'}`}>
                      Teléfono*
                    </label>
                  <input
                    className={`inputs-edit-farmer2 ${isFormSubmitted && !values.telefono && 'red-input'}`}
                    type="text"
                    required
                    name="telefono"
                    maxLength="10"
                    placeholder="Ingrese su número telefónico"
                    value={values.telefono}
                    onFocus={handleInputFocus} 
                    onBlur={handleInputBlur}   
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

          <label className='label-dato-farmer'>Edite sus datos de inicio de sesión</label>
          <div className="form-sec-farmer-edit">
            <div className="column-edit-farmer">
              <label className={`label-farmer-e ${isFormSubmitted && !values.nombreUsuario && 'red-label'}`}>
                Nombre de usuario*
              </label>
              <input
                className={`inputs-edit-farmer2 ${isFormSubmitted && !values.nombreUsuario && 'red-input'}`}
                type="text"
                required
                name="nombreUsuario"
                placeholder="Ingrese su nombre de usuario"
                value={values.nombreUsuario}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}  
              />
            </div>
            <div className="column-edit-farmer">
            <label className={`label-farmer-r ${isFormSubmitted && !values.contrasenia && 'red-label'}`}>
                Contraseña*
            </label>
                <input
                  className= {`inputs-edit-farmer2 ${isFormSubmitted && !values.contrasenia && 'red-input'}`}
                  type="password"
                  name="contrasenia"
                  placeholder="Contraseña"
                  minLength="8"
                  onChange={(e) => handleInputChange(e)}
                  onFocus={handleInputFocus} 
                  onBlur={async () => {
                  if (values.contrasenia) {
                    const validationMessage = validatePassword(values.contrasenia);
                  if (validationMessage !== true) {
                    setPasswordError(validationMessage);
                      }
                    }
                  }}
                />
                {isFormSubmitted && !values.contrasenia && <p className="error-password">Por favor ingrese una contraseña.</p>}
                {passwordError && <p className="error-password">{passwordError}</p>}
            </div>
          </div>
          <div className="password-rules-farmer-e">
              <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
                <br/>
                <label>*Debe incluir al menos: una mayúscula, número y un símbolo (Todos son válidos).</label>
            </div>
            <div className='button-container-admin'>
                  <button className='button-farmer' type="submit" onClick={onConfirmClick}>Guardar cambios</button>
                  {/* {isLoading ? 'Enviando..' : 'Enviar'} */}
                  <button className='button-farmer ' onClick={onCancelClick}>Cancelar</button>
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

export default EditFarmer;
