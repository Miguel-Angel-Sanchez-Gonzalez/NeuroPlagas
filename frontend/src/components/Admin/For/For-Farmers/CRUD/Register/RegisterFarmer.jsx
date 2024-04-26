import React, { useState } from 'react';
import './RegisterFarmer.css';

const RegisterFarmer = ({ onCancelClick }) => {
  const [records, setRecords] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Nuevo estado para controlar el enfoque en los inputs
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si el formulario se ha enviado

  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: "",
    nombreUsuario: "",
    contrasenia:""
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
  
  const validateEmail = (email) => {
    // Que el correo sea Gmail, Hotmail, Yahoo o Outlook
    const emailPattern = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/;
    return emailPattern.test(email); //true si es valido
  };
  

  const validatePhone = (phoneNumber) => {
    const phonePattern = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})?[-.]?([0-9]{4})$/;
    return phonePattern.test(phoneNumber);
  };
  
  
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
      setRecords('El correo electrónico no es válido.');
      return;
    }

    //Validando que el correo exista
    const emailExists = await checkEmailExists(values.correo);
    if (emailExists) {
      setEmailExists(true);
      return;
    }
    
    const phoneValidate = validatePhone(values.telefono);
    if(!phoneValidate){
      setRecords('El teléfono ingresado no es válido')
    }

    const data = {
      name: values.nombre,
      surname: values.primerApellido,
      secondSurname: values.segundoApellido,
      phone: values.telefono,
      email: values.correo,
      nameUser: values.nombreUsuario,
      password: values.contrasenia
    };

    //Se esta haciendo la promesa
      const response = await fetch('http://localhost:3000/farmer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }) 
        if (response){
          alert('Se ha agregado correctamente el agricultor.');
          window.location.reload();
        } else {
          setRecords('Por favor, inténtelo de nuevo más tarde.');
        }
      
  };


  return (
    <div className="register-farmer-form">
      <div className='centrar-farmer'>
      <h4 className='h4register'>Registrar agricultor</h4>
      <h5 className='h5register'>*Campos requeridos</h5>
      <label className='label-register-farmer'>Registre sus datos personales</label>
      <div className="form-section-farmer">
        <div className="column-admin-register">
            <label className={`label-farmer ${isFormSubmitted && !values.nombre && 'red-label'}`}>
              Nombre*
            </label>
          <input
            className={`inputs-register-farmer ${isFormSubmitted && !values.nombre && 'red-input'}`}
            type="text"
            required
            name="nombre"
            placeholder="Ingrese su nombre"
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
        <div className="column-admin-register">
            <label className={`label-farmer ${isFormSubmitted && !values.primerApellido && 'red-label'}`}>
              Primer apellido*
            </label>
          <input
            className={`inputs-register-farmer ${isFormSubmitted && !values.primerApellido && 'red-input'}`}
            type="text"
            required
            name="primerApellido"
            placeholder="Ingrese su primer apellido"
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
        <div className="column-admin-register">
            <label className={`label-farmer ${isFormSubmitted && !values.segundoApellido && 'red-label'}`}>
              Segundo apellido*
            </label>
          <input
            className={`inputs-register-farmer ${isFormSubmitted && !values.segundoApellido && 'red-input'}`}
            type="text"
            required
            name="segundoApellido"
            placeholder="Ingrese su segundo apellido"
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
      </div>
      <div className="form-section-farmer">
        <div className="column-admin-register">
            <label className={`label-farmer ${isFormSubmitted && !values.correo && 'red-label'}`}>
              Correo*
            </label>
          <input
            className={`inputs-register-farmer ${isFormSubmitted && !values.correo ? 'red-input' : ''}`}
            type="email" // Utiliza el tipo email
              required
              name="correo"
              placeholder="ejemplo@gmail.com"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={async () => {
                handleInputBlur();
                if (values.correo && validateEmail(values.correo)) {
                  const emailExists = await checkEmailExists(values.correo);
                  setEmailExists(emailExists);
                }
              }}
              
            />
            {emailExists && <p className="email-exists">Correo ya existente.</p>}
        </div>
        <div className="column-admin-register">
            <label className={`label-farmer ${isFormSubmitted && !values.telefono && 'red-label'}`}>
              Teléfono*
            </label>
          <input
            className={`inputs-register-farmer ${isFormSubmitted && !values.telefono && 'red-input'}`}
            type="text"
            required
            name="telefono"
            placeholder="Ingrese su número telefónico"
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
        <div></div>
      </div>

      <label className='label-register-farmer'>Registre sus datos de inicio de sesión</label>
      <div className="form-section-farmer">
        <div className="column-admin-register">
            <label className={`label-farmer ${isFormSubmitted && !values.nombreUsuario && 'red-label'}`}>
              Nombre de usuario*
            </label>
          <input
            className={`inputs-register-farmer2 ${isFormSubmitted && !values.nombreUsuario && 'red-input'}`}
            type="text"
            required
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
        <div className="column-admin-register">
            <label className={`label-farmer ${isFormSubmitted && !values.contrasenia && 'red-label'}`}>
              Contraseña*
            </label>
          <input
            className={`inputs-register-farmer2 ${isFormSubmitted && !values.contrasenia && 'red-input'}`}
            type="password"
            required
            name="contrasenia"
            placeholder="Contraseña"
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Nuevo evento de enfoque
            onBlur={handleInputBlur}   // Nuevo evento de desenfoque
          />
        </div>
      </div>
      <div className="password-rules-farmer">
        <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
        <label>*Debes de incluir letras mayúsculas y minúsculas</label>
        <label>*Debes de incluir al menos un número y un símbolo (Todos son válidos).</label>
      </div>
        <div className='button-container-admin'>
          <button className='button-admin' type="submit" onClick={handleSubmit}>Guardar</button>
          <button className='button-cancel-admin ' onClick={onCancelClick}>Cancelar</button>
        </div>
        {records && !isInputFocused && <p className='error-message'>{records}</p>}
    </div>
    </div>
  );
};

export default RegisterFarmer;
