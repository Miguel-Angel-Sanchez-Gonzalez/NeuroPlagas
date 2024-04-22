import React, { useState } from 'react';
import './EditPlague.css';

const EditPlague = ({ rowData, onCancelClick }) => {
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
    <div className="edit-plague-form">
      <div className='centrar-plague'>
      <h4 className='h4edit'>Editar plaga</h4>
      <h5 className='h5edit'>*Campos requeridos</h5>
      <label className='label-datos-plague'>Edite una nueva plaga</label>
      <div className="form-section-plague">
        <div className="column-admin-edit">
          <label className='label-plague'>Nombre de la plaga*</label>
          <input
            className='inputs-edit-plague'
            type="text"
            required
            name="nombrePlaga"
            placeholder="Ingrese el nombre de la plaga"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-admin-edit">
          <label className='label-plague'>Nombre científico*</label>
          <input
            className='inputs-edit-plague'
            type="text"
            required
            name="nombreCientifico"
            placeholder="Ingrese el nombre científico"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-section-plague">
        <div className="column-admin-edit">
          <label className='label-plague'>Descripción*</label>
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
          <label className='label-plague'>Recomendacciones*</label>
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
      <div className="form-section-plague">
        <div className="column-admin-edit">
          <label className='label-plague'>Acciones*</label>
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
          <button className='button-admin' type="submit" >Guardar</button>
          <button className='btncan-edit-plague' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default EditPlague;
