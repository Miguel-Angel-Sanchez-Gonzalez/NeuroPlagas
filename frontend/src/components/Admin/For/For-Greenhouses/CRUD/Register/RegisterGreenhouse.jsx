import React, { useState } from 'react';
import './RegisterGreenhouse.css';

const RegisterGreenhouse = ({ onCancelClick }) => {

  const [values, setValues] = useState({
    nombreInvernadero: "",
    tipoInvernadero: "",
    humedad: "",
    tamanio: "",
    agricultorResponsable: ""
  });

  const handdleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  return (
    <div className="register-greenhouse-form">
      <div className='centrar-greenhouse'>
      <h4 className='h4register'>Registrar invernadero</h4>
      <h5 className='h5register'>*Campos requeridos</h5>
      <label className='datos-greenhouse'>Registre los datos del invernadero</label>
      <div className="form-section-greenhouse">
        <div className="column-admin-greenhouse">
          <label className='label-greenhouse'>Nombre del invernadero*</label>
          <input
            className='inputs-register-greenhouse'
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
            className='inputs-register-greenhouse'
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
            className='inputs-register-greenhouse'
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
            className='inputs-register-greenhouse'
            type="text"
            required
            name="tamanio"
            placeholder="Ingrese el tamaño en mts."
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <h4 className='datos-greenhouse'>Registrar datos del agricultor </h4>
      <div className="form-section-greenhouse">
        <div className="column-admin-greenhouse">
        <label className='label-greenhouse'>Agricultor responsable*</label>
          <input
            className='inputs-register-greenhouse2'
            type="text"
            required
            name="nombreUsuario"
            placeholder="Nombre de usuario"
            onChange={handdleInputChange}
          />
        </div>
      </div>
      <div className='button-container-register'>
        <button className='button-admin' type="submit" >Guardar cambios</button>
        <button className='button-cancel-admin ' onClick={onCancelClick}>Cancelar</button>
      </div>
    </div>
    </div>
  );
};

export default RegisterGreenhouse;
