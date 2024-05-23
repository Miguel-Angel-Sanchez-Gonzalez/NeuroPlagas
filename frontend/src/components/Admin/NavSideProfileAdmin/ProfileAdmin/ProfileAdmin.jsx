import React, { useState, useEffect } from 'react';
import './ProfileAdmin.css';
import AddNotification from '../../../LoginNotifications/AddNotification';

const ProfileAdmin = ({ onCancelClick }) => {
  const [records, setRecords] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); 
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

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
    setValues(values => ({
      ...values,
      [name]: value,
    }));
    if (name === 'correo') {
      setEmailExists(false);
    }
    if (name === 'contrasenia') {
      setPasswordError('');
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); 
    setRecords(''); 
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); 
  };

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
      console.error('Error al verificar la existencia del correo electrónico:', error);
      alert('Error al verificar la existencia del correo electrónico');
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|itoaxaca\.edu.mx)$/;
    return emailPattern.test(email); 
  };

  const validatePhone = (phoneNumber) => {
    const phonePattern = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})?[-.]?([0-9]{4})$/;
    return phonePattern.test(phoneNumber) && phoneNumber.length === 10;
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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/`);
        if (response.status === 200) {
          const data = await response.json();
          console.log(data[0]);
          setOriginalEmail(data[0].correo_electronico);
          setValues({
            nombre: data[0].nombre,
            primerApellido: data[0].primer_apellido,
            segundoApellido: data[0].segundo_apellido,
            telefono: data[0].telefono,
            correo: data[0].correo_electronico,
            nombreUsuario: data[0].nombre_usuario,
            contrasenia: data[0].contrasenia
          });
        } else {
          throw new Error('Error al obtener al administrador');
        }
      } catch (error) {
        console.error('Error al obtener al administrador:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const data = {
    name: values.nombre,
    surname: values.primerApellido,
    secondSurname: values.segundoApellido,
    phone: values.telefono,
    email: values.correo,
    nameUser: values.nombreUsuario,
    password: values.contrasenia
  };

  const onConfirmClick = async () => {
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

    if (values.correo !== originalEmail) {
      try {
        const emailExists = await checkEmailExists(values.correo);
        if (emailExists) {
          setEmailExists(true);
          return;
        } else {
          setEmailExists(false);
        }
      } catch (error) {
        console.error('Error al verificar la existencia del correo electrónico:', error);
      }
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
    updateAdminData();
  };

  const updateAdminData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/admin/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setIsLoading(false);
        setLoadingMessage('El administrador se actualizó correctamente.');
        setTimeout(() => {
          setLoadingMessage(''); 
          window.location.reload();
        }, 2000); 
      } else {
        throw new Error('No se pudo actualizar al administrador');
      }
    } catch (error) {
      console.error('Error al actualizar al administrador:', error);
      alert("Error al actualizar al administrador");
      window.location.reload();
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
      <div className="profile-admin-form">
        <div className='centrar-admin'>
          <h4 className='h4profile'>Editar perfil</h4>
          <h5 className='h5profile'>*Campos requeridos</h5>
          <label className='titles-datos-admin'>Edite sus datos personales</label>
          <div className="form-section-profile">
            <div className="column-admin-profile">
              <label className={`titles-admin ${isFormSubmitted && !values.nombre && 'red-label'}`}>
                Nombre*
              </label>
              <input
                className={`inputs-profile-admin ${isFormSubmitted && !values.nombre && 'red-input'}`}
                type="text"
                required
                name="nombre"
                placeholder="Ingrese su nombre"
                value={values.nombre}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                style={values.nombre ? { backgroundColor: '#EFF6FF' } : null}
              />
            </div>
            <div className="column-admin-profile">
              <label className={`titles-admin ${isFormSubmitted && !values.primerApellido && 'red-label'}`}>
                Primer apellido*
              </label>
              <input
                className={`inputs-profile-admin ${isFormSubmitted && !values.primerApellido && 'red-input'}`}
                type="text"
                required
                name="primerApellido"
                placeholder="Ingrese su primer apellido"
                value={values.primerApellido}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                style={values.primerApellido ? { backgroundColor: '#EFF6FF' } : null}  
              />
            </div>
            <div className="column-admin-profile">
              <label className={`titles-admin ${isFormSubmitted && !values.segundoApellido && 'red-label'}`}>
                Segundo apellido*
              </label>
              <input
                className={`inputs-profile-admin ${isFormSubmitted && !values.segundoApellido && 'red-input'}`}
                type="text"
                required
                name="segundoApellido"
                placeholder="Ingrese su segundo apellido"
                value={values.segundoApellido}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.segundoApellido ? { backgroundColor: '#EFF6FF' } : null} 
              />
            </div>
          </div>
          <div className="form-section-profile">
            <div className="column-admin-profile">
              <label className={`titles-admin ${isFormSubmitted && !values.correo && 'red-label'}`}>
                Correo*
              </label>
              <input
                className={`inputs-profile-admin ${isFormSubmitted && !values.correo && 'red-input'}`}
                type="email"
                required
                name="correo"
                placeholder="ejemplo@gmail.com"
                value={values.correo}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}   
                style={values.correo ? { backgroundColor: '#EFF6FF' } : null}
              />
              {values.correo && !validateEmail(values.correo) && isFormSubmitted && (
                <p className="error-message-farmer">Correo electrónico inválido.</p>
              )}
              {emailExists && values.correo !== originalEmail && (
                <p className="email-exists-Fr">El correo ya está en uso.</p>
              )}
            </div>
            <div className="column-admin-profile">
              <label className={`titles-admin ${isFormSubmitted && !values.telefono && 'red-label'}`}>
                Teléfono*
              </label>
              <input
                className={`inputs-profile-admin ${isFormSubmitted && !values.telefono && 'red-input'}`}
                type="text"
                required
                name="telefono"
                placeholder="Ingrese su número telefónico"
                value={values.telefono}
                onChange={(e) => {
                  const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setValues(prevState => ({
                    ...prevState,
                    telefono: phoneNumber,
                  }));
                }}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}  
                style={values.telefono ? { backgroundColor: '#EFF6FF' } : null} 
              />
            </div>
            <div></div>
          </div>
    
          <h4 className='titles-datos-admin'>Configure los datos de inicio de sesión</h4>
          <div className="form-section-profile">
            <div className="column-admin-profile">
              <label className={`titles-admin ${isFormSubmitted && !values.nombreUsuario && 'red-label'}`}>
                Nombre de usuario*
              </label>
              <input
                className={`inputs-profile-admin2 ${isFormSubmitted && !values.nombreUsuario && 'red-input'}`}
                type="text"
                required
                name="nombreUsuario"
                placeholder="Ingrese su nombre de usuario"
                value={values.nombreUsuario}
                onChange={handleInputChange}
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                style={values.nombreUsuario ? { backgroundColor: '#EFF6FF' } : null}
              />
            </div>
            <div className="column-admin-profile">
              <label className={`titles-admin ${isFormSubmitted && !values.contrasenia && 'red-label'}`}>
                Contraseña*
              </label>
              <input
                className={`inputs-profile-admin2 ${isFormSubmitted && !values.contrasenia && 'red-input'}`}
                type="password"
                required
                name="contrasenia"
                placeholder="Contraseña"
                value={values.contrasenia}
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
                style={values.contrasenia ? { backgroundColor: '#EFF6FF' } : null}
              />
              {isFormSubmitted && !values.contrasenia && <p className="error-password">Por favor ingrese una contraseña.</p>}
              {passwordError && <p className="error-password">{passwordError}</p>}
            </div>
          </div>
          <div className="password-rules-admin">
            <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
            <br />
            <label>*Debe incluir al menos: una mayúscula, número y un símbolo (Todos son válidos).</label>
          </div>
          <div className='button-container-profile'>
            <button className='button-admin' type="submit" onClick={onConfirmClick}>Guardar</button>
            <button className='button-admin ' onClick={onCancelClick}>Cancelar</button>
          </div>
          {records && !isInputFocused && <p className='error-msg-profile-admin'>{records}</p>}
        </div>
        {loadingMessage && (
          <AddNotification message={loadingMessage} onClose={() => setLoadingMessage('')} className="farmer-notification" />
        )}
      </div>
    </div>
  );
};

export default ProfileAdmin;
