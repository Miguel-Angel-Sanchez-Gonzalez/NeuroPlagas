import React, { useState } from 'react';
import './EditGreenhouse.css';

const EditGreenhouse = ({ rowData, onCancelClick }) => {
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
    <div className="edit-greenhouse-form">
    <div className='centrar-greenhouse'>
    <h4 className='h4edit'>Editar invernadero</h4>
    <h5 className='h5edit'>*Campos requeridos</h5>
    <label className='datos-greenhouse'>Edite los datos del invernadero</label>
    <div className="form-section-greenhouse">
      <div className="column-admin-greenhouse">
        <label className='label-greenhouse'>Nombre del invernadero*</label>
        <input
          className='inputs-edit-greenhouse'
          type="text"
          required
          name="nombreInvernadero"
          placeholder="Ingrese el nombre del invernadero"
          onChange={handdleInputChange}
        />
      </div>
      <div className="column-admin-greenhouse">
        <label className='label-greenhouse'>Tipo de invernadero*</label>
        <input
          className='inputs-edit-greenhouse'
          type="text"
          required
          name="tipoInvernadero"
          placeholder="Ingrese tipo de invernadero"
          onChange={handdleInputChange}
        />
      </div>
    </div>
    <div className="form-section-greenhouse">
      <div className="column-admin-greenhouse">
        <label className='label-greenhouse'>Humedad*</label>
        <input
          className='inputs-edit-greenhouse'
          type="text"
          required
          name="humedad"
          placeholder="Humedad en °C"
          onChange={handdleInputChange}
        />
      </div>
      <div className="column-admin-greenhouse">
        <label className='label-greenhouse'>Tamaño*</label>
        <input
          className='inputs-edit-greenhouse'
          type="text"
          required
          name="tamanio"
          placeholder="Ingrese el tamaño en mts"
          onChange={handdleInputChange}
        />
      </div>
    </div>
    <h4 className='datos-greenhouse'>Registrar datos del agricultor </h4>
    <div className="form-section-greenhouse">
      <div className="column-admin-greenhouse">
      <label className='label-greenhouse'>Agricultor responsable*</label>
        <input
          className='inputs-edit-greenhouse2'
          type="text"
          required
          name="nombreUsuario"
          placeholder="Nombre de usuario"
          onChange={handdleInputChange}
        />
      </div>
    </div>
    <div className='edit-container-greenhouse'>
      <button className='button-greenhouse' type="submit" >Guardar cambios</button>
      <button className='button-cancel-greenhouse ' onClick={onCancelClick}>Cancelar</button>
    </div>
  </div>
  </div>
  );
};

export default EditGreenhouse;
