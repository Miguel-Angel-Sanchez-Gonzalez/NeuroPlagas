import React, { useState } from 'react';
import './RegisterPlague.css';

const RegisterPlague = ({ onCancelClick }) => {

  const [values, setValues] = useState({
    nombrePlaga: "",
    nombreCientifico: "",
    descripcion: "",
    recomendaciones: "",
    accionesTomar: ""
  });

  const handdleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  return (
    <div className="register-plague-form">
      <div className='centrar-plague'>
      <h4 className='h4register'>Registrar plaga</h4>
      <h5 className='h5register'>*Campos requeridos</h5>
      <label className='label-datos-plague'>Registre una nueva plaga</label>
      <div className="form-section-plague">
        <div className="column-admin-register">
          <label className='label-plague'>Nombre de la plaga*</label>
          <input
            className='inputs-register-plague'
            type="text"
            required
            name="nombrePlaga"
            placeholder="Ingrese el nombre de la plaga"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-plague'>Nombre científico*</label>
          <input
            className='inputs-register-plague'
            type="text"
            required
            name="nombreCientifico"
            placeholder="Ingrese el nombre científico"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-section-plague">
        <div className="column-admin-register">
          <label className='label-plague'>Descripción*</label>
          <input
            className='input-description-register'
            type="text"
            required
            name="descripcion"
            placeholder="Escriba una pequeña descripción"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-plague'>Recomendacciones*</label>
          <input
            className='input-description-register'
            type="text"
            required
            name="recomendaciones"
            placeholder="Ingrese las recomendaciones"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-section-plague">
        <div className="column-admin-register">
          <label className='label-plague'>Acciones*</label>
          <input
            className='input-description-register2'
            type="text"
            required
            name="acciones"
            placeholder="Mencione las acciones a tomar"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className='button-container-admin'>
          <button className='button-admin' type="submit" >Guardar</button>
          <button className='btncan-register-plague' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default RegisterPlague;
