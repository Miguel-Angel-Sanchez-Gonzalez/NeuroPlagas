import React, { useState } from 'react';
import './EditDisease.css';

const EditDisease = ({ rowData, onCancelClick }) => {
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

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios realizados en el formulario
    console.log("Valores modificados:", values);
  };


  return (
    <div className="edit-disease-form">
      <div className='centrar-disease'>
      <h4 className='h4register'>Editar enfermedad</h4>
      <h5>*Campos requeridos</h5>
      <label className='label-datos-disease'>Edite la enfermedad que desee</label>
      <div className="form-section-disease">
        <div className="column-admin-edit">
        <label className='label-disease'>Nombre de la enfermedad*</label>
          <input
            className='inputs-edit-disease'
            type="text"
            required
            name="nombreEnfermedad"
            placeholder="Ingrese el nombre de la enfermedad"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-edit">
          <label className='label-disease'>Nombre científico*</label>
          <input
            className='inputs-edit-disease'
            type="text"
            required
            name="nombreCientiico"
            placeholder="Ingrese el nombre científico"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-section-disease">
        <div className="column-admin-edit">
        <label className='label-disease'>Descripción*</label>
          <input
            className='input-description-edit'
            type="text"
            required
            name="descripcion"
            placeholder="Escriba una pequeña descripción"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-edit">
        <label className='label-disease'>Recomendacciones*</label>
          <input
            className='input-description-edit'
            type="text"
            required
            name="recomendaciones"
            placeholder="Ingrese las recomendaciones"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-section-disease">
        <div className="column-admin-edit">
        <label className='label-disease'>Acciones*</label>
          <input
            className='input-description-edit2'
            type="text"
            required
            name="acciones"
            placeholder="Mencione las acciones a tomar"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className='button-container-admin'>
          <button className='button-admin' type="submit" onClick={handleSaveChanges}>Guardar cambios</button>
          <button className='button-cancel-disease ' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default EditDisease;
