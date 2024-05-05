import React, { useState } from 'react';
import './EditWorker.css';

const EditWorker = ({ rowData, onCancelClick }) => {
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

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios realizados en el formulario
    console.log("Valores modificados:", values);
  };


  return (
    <div className="edit-worker-container">
      <div className='centrar-worker'>
      <h4 className='h4edit-worker'>Editar trabajador</h4>
      <h5 className='h5edit-worker'>*Campos requeridos</h5>
      <label className='label-dato-worker'>Edite sus datos personales</label>
      <div className="form-sec-worker-edit">
        <div className="column-edit-worker">
          <label  className='label-worker-e'>Nombre*</label>
          <input
            className='inputs-edit-worker'
            type="text"
            required
            name="nombre"
            placeholder="Ingrese su nombre"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-worker">
          <label  className='label-worker-e'>Primer apellido*</label>
          <input
            className='inputs-edit-worker'
            type="text"
            required
            name="primerApellido"
            placeholder="Ingrese su primer apellido"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-worker">
          <label  className='label-worker-e'>Segundo apellido*</label>
          <input
            className='inputs-edit-worker'
            type="text"
            required
            name="segundoApellido"
            placeholder="Ingrese su segundo apellido"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-sec-worker-edit">
        <div className="column-edit-worker">
          <label className='label-worker-e'>Correo*</label>
          <input
            className='inputs-edit-worker'
            type="text"
            required
            name="correo"
            placeholder="ejemplo@gmail.com"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-worker">
          <label className='label-worker-e'>Teléfono*</label>
          <input
            className='inputs-edit-worker'
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
        <label className='label-dato-worker'>Edite sus datos de inicio de sesión</label>
      </div>
      <div className="form-sec-worker-edit">
        <div className="column-edit-worker">
          <label className='label-worker-e'>Nombre de usuario*</label>
          <input
            className='inputs-edit-worker2'
            type="text"
            required
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-worker">
          <label className='label-worker-e'>Contraseña*</label>
          <input
            className='inputs-edit-worker2'
            type="password"
            required
            name="contrasenia"
            placeholder="Contraseña"
            onChange={handdleInputChange}
          />
      </div>
      </div>
      <div className="password-rules-worker-e">
        <label>*La contraseña debe ser mínimo de 8 caracteres.</label>
        <br/>
        <label>*Debes de incluir letras mayúsculas y minúsculas</label>
        <br/>
        <label>*Debes de incluir al menos un número y un símbolo (Todos son válidos).</label>
      </div>
      <label className='label-dato-worker'>Asigne su agricultor</label>
      <div className="form-sec-worker-edit">
        <div className="column-edit-worker">
          <label className='label-worker-e'>Agricultor responsable*</label>
          <input
            className='inputs-edit-worker3'
            type="text"
            required
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className='button-container-admin'>
          <button className='button-worker' type="submit">Guardar</button>
          <button className='button-worker' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default EditWorker;
