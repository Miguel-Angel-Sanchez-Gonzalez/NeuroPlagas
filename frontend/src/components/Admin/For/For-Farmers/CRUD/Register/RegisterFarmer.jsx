import React, { useState } from 'react';
import './RegisterFarmer.css';

const RegisterFarmer = ({ onCancelClick }) => {

  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    correo: "",
    nombreUsuario: "",
    contrasenia:""
  });

  const handdleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
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
            onChange={handdleInputChange}
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
            onChange={handdleInputChange}
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
            onChange={handdleInputChange}
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
            onChange={handdleInputChange}
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
            onChange={handdleInputChange}
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
            onChange={handdleInputChange}
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
            onChange={handdleInputChange}
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
