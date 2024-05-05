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
    <div className="edit-disease-container">
      <div className='centrar-disease'>
      <h4 className='h4edit-disease'>Editar enfermedad</h4>
      <h5 className='h5edit-disease'>*Campos requeridos</h5>
      <label className='label-dato-disease'>Edite la enfermedad que desee</label>
      <div className="form-sec-disease-edit">
        <div className="column-edit-disease">
        <label className='labels-disease-e'>Nombre de la enfermedad*</label>
          <input
            className='inputs-edit-disease'
            type="text"
            required
            name="nombreEnfermedad"
            placeholder="Ingrese el nombre de la enfermedad"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-disease">
          <label className='labels-disease-e'>Nombre científico*</label>
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
      <div className="form-sec-disease-edit">
        <div className="column-edit-disease">
        <label className='labels-disease-e'>Descripción*</label>
          <input
            className='textarea-disease-e'
            type="text"
            required
            name="descripcion"
            placeholder="Escriba una pequeña descripción"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-disease">
        <label className='labels-disease-e'>Recomendacciones*</label>
          <input
            className='textarea-disease-e'
            type="text"
            required
            name="recomendaciones"
            placeholder="Ingrese las recomendaciones"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-sec-disease-edit">
        <div className="column-edit-disease">
        <label className='labels-disease-e'>Acciones*</label>
          <input
            className='textarea-disease-e2'
            type="text"
            required
            name="acciones"
            placeholder="Mencione las acciones a tomar"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className='button-container-admin'>
          <button className='button-disease-e' type="submit" onClick={handleSaveChanges}>Guardar cambios</button>
          <button className='button-disease-e ' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default EditDisease;
