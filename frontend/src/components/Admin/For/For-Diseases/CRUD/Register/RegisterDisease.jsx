import React, { useState } from 'react';
import './RegisterDisease.css';

const RegisterDisease = ({ onCancelClick }) => {

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
    <div className="register-disease-form">
      <div className='centrar-disease'>
      <h4 className='h4register'>Registrar enfermedad</h4>
      <h5 className='h5register'>*Campos requeridos</h5>
      <label className='label-datos-disease'>Registre una nueva enfermedad</label>
      <div className="form-section-disease">
        <div className="column-admin-register">
          <label className='label-disease'>Nombre de la enfermedad*</label>
          <input
            className='inputs-register-disease'
            type="text"
            required
            name="nombreEnfermedad"
            placeholder="Ingrese el nombre de la enfermedad"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-register">
          <label className='label-disease'>Nombre científico*</label>
          <input
            className='inputs-register-disease'
            type="text"
            required
            name="nombreCientifico"
            placeholder="Ingrese el nombre científico"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-section-disease">
        <div className="column-admin-register">
          <label className='label-disease'>Descripción*</label>
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
          <label className='label-disease'>Recomendacciones*</label>
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
      <div className="form-section-disease">
        <div className="column-admin-register">
          <label className='label-disease'>Acciones*</label>
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
          <button className='btncan-register-disease' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default RegisterDisease;
