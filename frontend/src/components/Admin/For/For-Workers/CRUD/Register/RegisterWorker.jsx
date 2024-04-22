import React, { useState } from 'react';
import './RegisterWorker.css';

const RegisterWorker = ({ onCancelClick }) => {

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
    <div className="register-worker-form">
      <div className='centrar-worker'>
      <h4 className='h4register'>Registre trabajador</h4>
      <h5 className='h5register'>*Campos requeridos</h5>
      <label className='label-register-worker'>Registre sus datos personales</label>
      <div className="form-section-worker">
        <div className="column-admin-register">
          <label  className='label-worker'>Nombre*</label>
          <input
            className='inputs-register-worker'
            type="text"
            required
            name="nombre"
            placeholder="Ingrese su nombre"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label  className='label-worker'>Primer apellido*</label>
          <input
            className='inputs-register-worker'
            type="text"
            required
            name="primerApellido"
            placeholder="Ingrese su primer apellido"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label  className='label-worker'>Segundo apellido*</label>
          <input
            className='inputs-register-worker'
            type="text"
            required
            name="segundoApellido"
            placeholder="Ingrese su segundo apellido"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-section-worker">
        <div className="column-admin-register">
          <label className='label-worker'>Correo*</label>
          <input
            className='inputs-register-worker'
            type="text"
            required
            name="correo"
            placeholder="ejemplo@gmail.com"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-worker'>Teléfono*</label>
          <input
            className='inputs-register-worker'
            type="text"
            required
            name="telefono"
            placeholder="Ingrese su número telefónico"
            onChange={handdleInputChange}
          />
        </div>
        <div></div>
      </div>
      <div className='espacio'>
        <label className='label-register-worker'>Registre sus datos de inicio de sesión</label>
      </div>
      <div className="form-section-worker">
        <div className="column-admin-register">
          <label className='label-worker'>Nombre de usuario*</label>
          <input
            className='inputs-register-worker2'
            type="text"
            required
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-worker'>Contraseña*</label>
          <input
            className='inputs-register-worker2'
            type="password"
            required
            name="contrasenia"
            placeholder="Contraseña"
            onChange={handdleInputChange}
          />
      </div>
      </div>
        <div className="rules-worker">
        <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
        <label>*Debes de incluir letras mayúsculas y minúsculas</label>
        <label>*Debes de incluir al menos un número y un símbolo (Todos son válidos).</label>
      </div>
      <label className='label-register-worker'>Asigne su agricultor</label>
      <div className="form-section-worker">
        <div className="column-admin-register">
          <label className='label-worker'>Agricultor responsable*</label>
          <input
            className='inputs-register-worker3'
            type="text"
            required
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className='button-container-admin'>
          <button className='button-admin' type="submit">Guardar</button>
          <button className='button-cancel-admin ' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default RegisterWorker;
