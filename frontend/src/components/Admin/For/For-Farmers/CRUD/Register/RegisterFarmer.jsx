import React, { useState } from 'react';
import './RegisterFarmer.css';

const RegisterFarmer = ({ onCancelClick }) => {
  const [records, setRecords] = useState('');
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
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); // Actualiza el estado cuando un input recibe enfoque
    setRecords(''); // Borra el mensaje de error
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Actualiza el estado cuando un input pierde el enfoque
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); 
    

    const data = {
      name: values.nombre,
      surname: values.primerApellido,
      description: values.segundoApellido,
      recommendations: values.telefono,
      actions: values.correo,
      actions: values.nombreUsuario,
      actions: values.contrasenia
    };

    for (const key in values) {
      if (values[key] === "") {
        setRecords('Por favor complete todos los campos.');
        return;
      }
    }

    //Se esta haciendo la promesa
      const response = await fetch('http://localhost:3000/disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }) 
        if (response){
          alert('Se ha agregado correctamente la enfermedad.');
          window.location.reload();
        } else {
          setRecords('Hubo un problema al agregar la enfermedad. Por favor, inténtelo de nuevo más tarde.');
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
          <label  className='label-farmer'>Nombre*</label>
          <input
            className='inputs-register-farmer'
            type="text"
            required
            name="nombre"
            placeholder="Ingrese su nombre"
            onChange={handleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label  className='label-farmer'>Primer apellido*</label>
          <input
            className='inputs-register-farmer'
            type="text"
            required
            name="primerApellido"
            placeholder="Ingrese su primer apellido"
            onChange={handleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label  className='label-farmer'>Segundo apellido*</label>
          <input
            className='inputs-register-farmer'
            type="text"
            required
            name="segundoApellido"
            placeholder="Ingrese su segundo apellido"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-section-farmer">
        <div className="column-admin-register">
          <label className='label-farmer'>Correo*</label>
          <input
            className='inputs-register-farmer'
            type="text"
            required
            name="correo"
            placeholder="ejemplo@gmail.com"
            onChange={handleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-farmer'>Teléfono*</label>
          <input
            className='inputs-register-farmer'
            type="text"
            required
            name="telefono"
            placeholder="Ingrese su número telefónico"
            onChange={handleInputChange}
          />
        </div>
        <div></div>
      </div>

      <label className='label-register-farmer'>Registre sus datos de inicio de sesión</label>
      <div className="form-section-farmer">
        <div className="column-admin-register">
          <label className='label-farmer'>Nombre de usuario*</label>
          <input
            className='inputs-register-farmer2'
            type="text"
            required
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            onChange={handleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-farmer'>Contraseña*</label>
          <input
            className='inputs-register-farmer2'
            type="password"
            required
            name="contrasenia"
            placeholder="Contraseña"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="password-rules-farmer">
        <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
        <label>*Debes de incluir letras mayúsculas y minúsculas</label>
        <label>*Debes de incluir al menos un número y un símbolo (Todos son válidos).</label>
      </div>
      <div className='button-container-admin'>
          <button className='button-admin' type="submit">Guardar</button>
          <button className='button-cancel-admin ' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default RegisterFarmer;
