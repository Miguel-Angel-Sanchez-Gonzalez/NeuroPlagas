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
    <div className="edit-plague-container">
      <div className='centrar-plague'>
      <h4 className='h4edit-plague'>Editar plaga</h4>
      <h5 className='h5edit-plague'>*Campos requeridos</h5>
      <label className='label-dato-plague'>Edite una nueva plaga</label>
      <div className="form-sec-plague-edit">
        <div className="column-edit-plague">
          <label className='labels-plague-e'>Nombre de la plaga*</label>
          <input
            className='inputs-edit-plague'
            type="text"
            required
            name="nombrePlaga"
            placeholder="Ingrese el nombre de la plaga"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-plague">
          <label className='labels-plague-e'>Nombre científico*</label>
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
      <div className="form-sec-plague-edit">
        <div className="column-edit-plague">
          <label className='labels-plague-e'>Descripción*</label>
          <input
            className='textarea-plague-e'
            type="text"
            required
            name="descripcion"
            placeholder="Escriba una pequeña descripción"
            onChange={handdleInputChange}
          />
        </div>
        <div className="column-edit-plague">
          <label className='labels-plague-e'>Recomendacciones*</label>
          <input
            className='textarea-plague-e'
            type="text"
            required
            name="recomendaciones"
            placeholder="Ingrese las recomendaciones"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className="form-sec-plague-edit">
        <div className="column-edit-plague">
          <label className='labels-plague-e'>Acciones*</label>
          <input
            className='textarea-plague-e2'
            type="text"
            required
            name="acciones"
            placeholder="Mencione las acciones a tomar"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className='button-container-admin'>
          <button className='button-plague-e' type="submit" >Guardar</button>
          <button className='button-plague-e' onClick={onCancelClick}>Cancelar</button>
        </div>
    </div>
    </div>
  );
};

export default EditPlague;
